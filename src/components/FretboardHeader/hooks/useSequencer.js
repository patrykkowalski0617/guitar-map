import { useEffect, useRef } from "react";
import { NOTES_FROM_C, SEQUENCER_PATTERNS } from "../../../data";
import { useStore } from "../../../store/useStore";

export const useSequencer = (shape, seqConfig) => {
  const setActiveSeqId = useStore((state) => state.setActiveSeqId);
  const timerRef = useRef(null);
  const patternIdxRef = useRef(0);
  const baseOffsetRef = useRef(0);
  const currentShapeRef = useRef([]);

  useEffect(() => {
    currentShapeRef.current = shape;

    patternIdxRef.current = 0;
    baseOffsetRef.current = 0;
  }, [shape, seqConfig?.isBackward, seqConfig?.activePattern]);

  useEffect(() => {
    const getSortedShape = (inputShape) => {
      if (!inputShape || inputShape.length === 0) return [];

      let sorted = [...inputShape].sort((a, b) => {
        const [strPartA, noteA] = a.split("_");
        const [strPartB, noteB] = b.split("_");
        const sNumA = parseInt(strPartA.replace(/\D/g, ""));
        const sNumB = parseInt(strPartB.replace(/\D/g, ""));
        if (sNumA !== sNumB) return sNumA - sNumB;
        const idxA = NOTES_FROM_C.indexOf(noteA);
        const idxB = NOTES_FROM_C.indexOf(noteB);
        const distForward = (idxB - idxA + 12) % 12;
        const distBackward = (idxA - idxB + 12) % 12;
        return distForward < distBackward ? -1 : 1;
      });

      if (seqConfig?.isBackward) {
        return sorted.reverse();
      }

      return sorted;
    };

    if (timerRef.current) clearInterval(timerRef.current);

    if (seqConfig?.isRunning && shape.length > 0) {
      timerRef.current = setInterval(() => {
        const sorted = getSortedShape(currentShapeRef.current);
        if (sorted.length === 0) return;

        const patternConfig =
          SEQUENCER_PATTERNS[seqConfig.activePattern] ||
          SEQUENCER_PATTERNS.linear;
        const { steps, offset } = patternConfig;

        const stepValue = steps[patternIdxRef.current];
        let finalIndex = baseOffsetRef.current + (stepValue - 1);

        if (finalIndex >= sorted.length) {
          finalIndex = 0;
          baseOffsetRef.current = 0;
          patternIdxRef.current = 0;
        }

        const activeId = sorted[finalIndex];

        setActiveSeqId(activeId);

        const isLastNoteOfShape = finalIndex === sorted.length - 1;

        patternIdxRef.current++;
        const isEndOfPattern = patternIdxRef.current >= steps.length;

        if (isLastNoteOfShape) {
          patternIdxRef.current = 0;
          baseOffsetRef.current = 0;
        } else if (isEndOfPattern) {
          patternIdxRef.current = 0;
          const nextBase = baseOffsetRef.current + offset;

          if (nextBase >= sorted.length) {
            baseOffsetRef.current = 0;
          } else {
            baseOffsetRef.current = nextBase;
          }
        }
      }, seqConfig.interval || 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      patternIdxRef.current = 0;
      baseOffsetRef.current = 0;
      setActiveSeqId(null);
    }

    return () => clearInterval(timerRef.current);
  }, [
    seqConfig?.isRunning,
    seqConfig?.interval,
    seqConfig?.activePattern,
    seqConfig?.isBackward,
    shape.length,
    setActiveSeqId,
  ]);
};

import { useState, useRef, useEffect, useCallback } from "react";
import { getNotesFromNote } from "../../../utils";
import { NOTES_FROM_C } from "../../../data";

const STEP_DURATION = 700;
const START_DELAY = 700;

export const useVisualizerSequence = (engine) => {
  const [activeChordType, setActiveChordType] = useState(null);
  const [activeInterval, setActiveInterval] = useState(null);
  const timersRef = useRef([]);

  const stopSequence = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    engine.stopAllNotes();
    setActiveChordType(null);
    setActiveInterval(null);
  }, [engine]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const playSequence = async (type, chordNotes, profile, rootSemitone) => {
    await engine.unlockAudio();
    stopSequence();
    setActiveChordType(type);
    const rootNote = [...NOTES_FROM_C, ...NOTES_FROM_C][rootSemitone];
    console.log(rootNote);

    const DOUBLE_NOTES = getNotesFromNote(rootNote, 24);
    const rootIndex = DOUBLE_NOTES.indexOf(rootNote);

    // --- LOG DANYCH AKORDU ---
    console.group(`🎸 SEQUENCE START: ${rootNote} ${type.toUpperCase()}`);
    console.log(`Root Note: ${rootNote} (Index: ${rootIndex})`);
    console.log(`Chord Pad Notes:`, chordNotes);
    console.table(
      profile?.usedTones?.map((t) => ({
        Interval: t[0],
        Semitones: t[1],
        Resulting_Note: DOUBLE_NOTES[rootIndex + t[1]],
      }))
    );
    console.groupEnd();

    // 1. Graj akord tła (Pad)
    if (chordNotes) {
      chordNotes.forEach((n) => engine.playNote(n, 4, true));
    }

    // 2. Budowa sekwencji na podstawie usedTones
    const sequenceData = (profile?.usedTones || []).map((t) => {
      const interval = t[0];
      const semitones = t[1];
      const totalSteps = rootIndex + semitones;

      return {
        interval,
        note: DOUBLE_NOTES[totalSteps],
        octave: 4 + Math.floor(totalSteps / 12),
        semitones,
      };
    });

    if (sequenceData.length === 0) return;

    // 3. Ruch góra -> dół
    const fullSequence = [
      ...sequenceData,
      ...[...sequenceData].reverse().slice(1),
    ];

    // 4. Harmonogram odtwarzania
    fullSequence.forEach((step, index) => {
      const timer = setTimeout(() => {
        setActiveInterval(step.interval);

        if (step.note) {
          // --- LOG POJEDYNCZEJ NUTY ---
          console.log(
            `%c[STEP ${index + 1}] %c${step.note}${step.octave} %c(Int: ${
              step.interval
            }, +${step.semitones}st)`,
            "color: #888",
            "color: #2196F3; font-weight: bold",
            "color: #e67e22"
          );

          engine.playNote(step.note, step.octave, false);

          const stopTimer = setTimeout(
            () => engine.stopNote(step.note, step.octave, false),
            STEP_DURATION - 100
          );
          timersRef.current.push(stopTimer);
        }

        if (index === fullSequence.length - 1) {
          const finalDelay = setTimeout(() => {
            setActiveInterval(null);
            const stopTimer = setTimeout(() => stopSequence(), STEP_DURATION);
            timersRef.current.push(stopTimer);
          }, STEP_DURATION);
          timersRef.current.push(finalDelay);
        }
      }, START_DELAY + index * STEP_DURATION);

      timersRef.current.push(timer);
    });
  };

  return {
    activeChordType,
    activeInterval,
    playSequence,
    stopSequence,
  };
};

import { useState, useRef, useEffect, useCallback } from "react";

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
    return () => stopSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playSequence = async (type, chordNotes, profile, shapeNotes) => {
    await engine.unlockAudio();
    stopSequence();
    setActiveChordType(type);

    if (chordNotes) chordNotes.forEach((n) => engine.playNote(n, 4, true));

    const INTERVALS = [1, 3, 5, 7, 9, 11, 13];
    const baseTones = INTERVALS.filter(
      (int) =>
        profile?.exposedTone === int ||
        profile?.usedTones?.includes(int) ||
        profile?.alteredTones?.includes(int)
    );

    const sequenceData = baseTones.map((interval, index) => ({
      interval,
      note: shapeNotes[index],
    }));

    const fullSequence = [
      ...sequenceData,
      ...[...sequenceData].reverse().slice(1),
    ];

    fullSequence.forEach((step, index) => {
      const timer = setTimeout(() => {
        setActiveInterval(step.interval);

        if (step.note) {
          engine.playNote(step.note, 4, false);
          setTimeout(
            () => engine.stopNote(step.note, 4, false),
            STEP_DURATION - 100
          );
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

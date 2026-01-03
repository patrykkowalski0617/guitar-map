import { useState, useRef, useEffect, useCallback } from "react";
import { NOTES_FROM_C } from "../../../data";

const STEP_DURATION = 700;
const START_DELAY = 700;

const getVoicedNotes = (notes, startOctave = 4) => {
  let octave = startOctave;
  let lastIndex = null;

  return notes.map((note) => {
    const index = NOTES_FROM_C.indexOf(note);

    if (lastIndex !== null && index <= lastIndex) {
      octave += 1;
    }

    lastIndex = index;
    return { note, octave };
  });
};

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

  const playSequence = async (type, chordNotes, profile, shapeNotes) => {
    await engine.unlockAudio();
    stopSequence();
    setActiveChordType(type);

    if (chordNotes) chordNotes.forEach((n) => engine.playNote(n, 4, true));

    const voicedNotes = getVoicedNotes(shapeNotes, 4);

    const INTERVALS = [1, 3, 5, 7, 9, 11, 13];
    const baseTones = INTERVALS.filter(
      (int) =>
        profile?.exposedTone === int ||
        profile?.usedTones?.includes(int) ||
        profile?.alteredTones?.includes(int)
    );

    const sequenceData = baseTones.map((interval, index) => ({
      interval,
      noteData: voicedNotes[index],
    }));

    const fullSequence = [
      ...sequenceData,
      ...[...sequenceData].reverse().slice(1),
    ];

    fullSequence.forEach((step, index) => {
      const timer = setTimeout(() => {
        setActiveInterval(step.interval);

        if (step.noteData) {
          engine.playNote(step.noteData.note, step.noteData.octave, false);

          setTimeout(
            () =>
              engine.stopNote(step.noteData.note, step.noteData.octave, false),
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

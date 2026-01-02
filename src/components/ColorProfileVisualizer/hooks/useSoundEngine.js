import { useRef } from "react";
import { NOTES_FROM_C } from "../../../data";

const createFrequencyMap = () => {
  const map = {};
  const baseFreqs = [
    261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0,
    466.16, 493.88,
  ];
  NOTES_FROM_C.forEach((name, i) => {
    map[`${name}3`] = baseFreqs[i];
    map[`${name}4`] = baseFreqs[i];
    map[`${name}5`] = baseFreqs[i];
  });
  return map;
};

const FREQUENCIES = createFrequencyMap();

export const useSoundEngine = () => {
  const audioCtx = useRef(null);
  const oscillators = useRef({});
  const masterGain = useRef(null);

  const initAudio = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      masterGain.current = audioCtx.current.createGain();
      masterGain.current.gain.setValueAtTime(0.5, audioCtx.current.currentTime);
      masterGain.current.connect(audioCtx.current.destination);
    }
  };

  const playNote = (noteName, octave = 4, isDark = false) => {
    initAudio();
    if (audioCtx.current.state === "suspended") return;

    const role = isDark ? "pad" : "lead";
    const noteKey = `${noteName}${octave}_${role}`;
    const now = audioCtx.current.currentTime;

    if (oscillators.current[noteKey]) {
      const old = oscillators.current[noteKey];
      try {
        old.gainNode.gain.cancelScheduledValues(now);
        old.osc.stop();
        old.osc.disconnect();
      } catch (e) {}
      delete oscillators.current[noteKey];
    }

    const freq = FREQUENCIES[`${noteName}${octave}`];
    if (!freq) return;

    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();
    const filter = audioCtx.current.createBiquadFilter();

    osc.type = isDark ? "sine" : "triangle";
    osc.frequency.setValueAtTime(freq, now);

    osc.detune.setValueAtTime(Math.random() * 6 - 3, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(isDark ? 400 : 1200, now);
    filter.Q.setValueAtTime(1, now);

    gainNode.gain.setValueAtTime(0, now);
    const targetGain = isDark ? 0.04 : 0.08;
    gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.05);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGain.current);

    osc.start(now);
    oscillators.current[noteKey] = { osc, gainNode, isStopping: false };
  };

  const stopNote = (noteName, octave = 4, isDark = false) => {
    const role = isDark ? "pad" : "lead";
    const noteKey = `${noteName}${octave}_${role}`;
    const activeData = oscillators.current[noteKey];

    if (activeData && !activeData.isStopping) {
      activeData.isStopping = true;
      const now = audioCtx.current.currentTime;
      activeData.gainNode.gain.cancelScheduledValues(now);
      activeData.gainNode.gain.setValueAtTime(
        activeData.gainNode.gain.value,
        now
      );
      activeData.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      setTimeout(() => {
        if (oscillators.current[noteKey] === activeData) {
          try {
            activeData.osc.stop();
            activeData.osc.disconnect();
            delete oscillators.current[noteKey];
          } catch (e) {}
        }
      }, 350);
    }
  };

  const stopAllNotes = () => {
    const now = audioCtx.current?.currentTime || 0;
    Object.keys(oscillators.current).forEach((key) => {
      const activeData = oscillators.current[key];
      if (activeData && !activeData.isStopping) {
        activeData.isStopping = true;
        activeData.gainNode.gain.cancelScheduledValues(now);
        activeData.gainNode.gain.exponentialRampToValueAtTime(
          0.0001,
          now + 0.2
        );

        setTimeout(() => {
          if (oscillators.current[key] === activeData) {
            try {
              activeData.osc.stop();
              activeData.osc.disconnect();
              delete oscillators.current[key];
            } catch (e) {}
          }
        }, 250);
      }
    });
  };

  return {
    playNote,
    stopNote,
    stopAllNotes,
    unlockAudio: async () => {
      initAudio();
      if (audioCtx.current.state === "suspended")
        await audioCtx.current.resume();
    },
  };
};

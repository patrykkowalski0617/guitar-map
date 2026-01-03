import { useRef } from "react";
import { NOTES_FROM_C } from "../../../data";

const createFrequencyMap = () => {
  const map = {};
  const baseFreqs = [
    261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0,
    466.16, 493.88,
  ];
  NOTES_FROM_C.forEach((name, i) => {
    map[`${name}3`] = baseFreqs[i] / 2;
    map[`${name}4`] = baseFreqs[i];
    map[`${name}5`] = baseFreqs[i] * 2;
  });
  return map;
};

const FREQUENCIES = createFrequencyMap();

export const useSoundEngine = () => {
  const audioCtx = useRef(null);
  const oscillators = useRef({});
  const masterGain = useRef(null);
  const compressor = useRef(null);

  const initAudio = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext ||
        window.webkitAudioContext)();

      compressor.current = audioCtx.current.createDynamicsCompressor();
      compressor.current.threshold.setValueAtTime(
        -24,
        audioCtx.current.currentTime
      );
      compressor.current.knee.setValueAtTime(30, audioCtx.current.currentTime);
      compressor.current.ratio.setValueAtTime(12, audioCtx.current.currentTime);
      compressor.current.attack.setValueAtTime(
        0.003,
        audioCtx.current.currentTime
      );
      compressor.current.release.setValueAtTime(
        0.25,
        audioCtx.current.currentTime
      );

      masterGain.current = audioCtx.current.createGain();
      masterGain.current.gain.setValueAtTime(0.4, audioCtx.current.currentTime);

      compressor.current.connect(masterGain.current);
      masterGain.current.connect(audioCtx.current.destination);
    }
  };

  const playNote = (noteName, octave = 4, isDark = false) => {
    initAudio();
    if (audioCtx.current.state === "suspended") return;

    const role = isDark ? "pad" : "lead";
    const noteKey = `${noteName}${octave}_${role}`;
    const now = audioCtx.current.currentTime + 0.01;

    if (oscillators.current[noteKey]) {
      const old = oscillators.current[noteKey];
      old.gainNode.gain.cancelScheduledValues(now);
      old.gainNode.gain.setTargetAtTime(0, now, 0.02);
      try {
        old.oscs.forEach((o) => o.stop(now + 0.1));
      } catch (e) {}
    }

    const freq = FREQUENCIES[`${noteName}${octave}`];
    if (!freq) return;

    const gainNode = audioCtx.current.createGain();
    const filter = audioCtx.current.createBiquadFilter();

    const osc1 = audioCtx.current.createOscillator();
    const osc2 = audioCtx.current.createOscillator();

    osc1.type = isDark ? "sine" : "triangle";
    osc2.type = isDark ? "sine" : "triangle";

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq, now);

    osc1.detune.setValueAtTime(-6 + Math.random() * 2, now);
    osc2.detune.setValueAtTime(6 + Math.random() * 2, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(isDark ? 800 : 1200, now);
    filter.Q.setValueAtTime(0.7, now);

    gainNode.gain.setValueAtTime(0, now);
    const targetGain = isDark ? 0.06 : 0.1;
    gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.08);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(compressor.current);

    osc1.start(now);
    osc2.start(now);

    oscillators.current[noteKey] = {
      oscs: [osc1, osc2],
      gainNode,
      isStopping: false,
    };
  };

  const stopNote = (noteName, octave = 4, isDark = false) => {
    const role = isDark ? "pad" : "lead";
    const noteKey = `${noteName}${octave}_${role}`;
    const activeData = oscillators.current[noteKey];

    if (activeData && !activeData.isStopping) {
      activeData.isStopping = true;
      const now = audioCtx.current.currentTime;
      const releaseTime = 0.4;

      activeData.gainNode.gain.cancelScheduledValues(now);
      activeData.gainNode.gain.setTargetAtTime(0, now, releaseTime / 4);

      setTimeout(() => {
        try {
          activeData.oscs.forEach((o) => {
            o.stop();
            o.disconnect();
          });
          if (oscillators.current[noteKey] === activeData) {
            delete oscillators.current[noteKey];
          }
        } catch (e) {}
      }, releaseTime * 1000 + 100);
    }
  };

  const stopAllNotes = () => {
    if (!audioCtx.current) return;
    const now = audioCtx.current.currentTime;

    Object.keys(oscillators.current).forEach((key) => {
      const activeData = oscillators.current[key];
      try {
        activeData.gainNode.gain.cancelScheduledValues(now);
        activeData.gainNode.gain.linearRampToValueAtTime(0, now + 0.05);
        activeData.oscs.forEach((o) => o.stop(now + 0.1));
      } catch (e) {}
    });

    oscillators.current = {};
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

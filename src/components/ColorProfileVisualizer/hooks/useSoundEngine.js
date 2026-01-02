import { useRef } from "react";
import { NOTES_FROM_C } from "../../../data";

const createFrequencyMap = () => {
  const map = {};
  // Częstotliwości bazowe dla oktawy 4 (środkowe C to ok. 261.63Hz)
  const baseFreqs = [
    261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0,
    466.16, 493.88,
  ];

  NOTES_FROM_C.forEach((name, i) => {
    map[`${name}3`] = baseFreqs[i] / 2; // Oktawa 3
    map[`${name}4`] = baseFreqs[i]; // Oktawa 4
    map[`${name}5`] = baseFreqs[i] * 2; // Oktawa 5
  });
  return map;
};

const FREQUENCIES = createFrequencyMap();

export const useSoundEngine = () => {
  const audioCtx = useRef(null);
  const oscillators = useRef({}); // Przechowuje grające oscylatory

  const initAudio = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    if (audioCtx.current.state === "suspended") audioCtx.current.resume();
  };

  const playNote = (noteName, octave = 4) => {
    initAudio();
    const noteKey = `${noteName}${octave}`;

    // Jeśli ta nuta już gra, nie odpalamy jej drugi raz
    if (oscillators.current[noteKey]) return;

    const freq = FREQUENCIES[noteKey];
    if (!freq) return;

    const now = audioCtx.current.currentTime;
    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();
    const filter = audioCtx.current.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05); // Krótki attack

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);

    osc.start();

    // Zapisujemy referencję, żeby móc ją potem zatrzymać
    oscillators.current[noteKey] = { osc, gainNode };
  };

  const stopNote = (noteName, octave = 4) => {
    const noteKey = `${noteName}${octave}`;
    const activeData = oscillators.current[noteKey];

    if (activeData) {
      const { osc, gainNode } = activeData;
      const now = audioCtx.current.currentTime;

      // Miękkie wyciszenie (release), żeby nie było kliknięcia
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      setTimeout(() => {
        osc.stop();
        osc.disconnect();
      }, 350);

      delete oscillators.current[noteKey];
    }
  };

  return { playNote, stopNote };
};

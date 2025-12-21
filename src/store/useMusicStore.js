import { create } from "zustand";

export const useMusicStore = create((set) => ({
  tuneKey: "C/Am",
  setTuneKey: (tuneKey) => set({ tuneKey }),

  musicFunction: "Tonics",
  setMusicFunction: (musicFunction) => set({ musicFunction }),

  functionType: "Major",
  setFunctionType: (functionTypes) => set({ functionTypes }),

  notesSet: "Triad",
  setNotesSet: (notesSet) => set({ notesSet }),

  chordType: "M",
  setChordType: (chordType) => set({ chordType }),

  string: "",
  setString: (string) => set({ string }),

  fret: "",
  setFret: (fret) => set({ fret }),
}));

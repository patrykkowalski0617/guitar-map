import { create } from "zustand";

export const useMusicStore = create((set) => ({
  tuneKey: "C/Am",
  setTuneKey: (tuneKey) => set({ tuneKey }),

  musicFunction: "Tonics",
  setMusicFunction: (musicFunction) => {
    console.log("musicFunction", musicFunction);
    return set({ musicFunction });
  },

  functionType: "Major",
  setFunctionType: (functionType) => set({ functionType }),

  notesSet: "Triad",
  setNotesSet: (notesSet) => set({ notesSet }),

  chordType: "M",
  setChordType: (chordType) => set({ chordType }),

  string: "",
  setString: (string) => set({ string }),

  fret: "",
  setFret: (fret) => set({ fret }),
}));

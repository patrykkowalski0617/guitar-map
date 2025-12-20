import { create } from "zustand";
import { MUSIC_FUCTIONS_NAMES, NOTES_FROM_C } from "../music-theory";

export const useMusicStore = create((set) => ({
  tuneKey: "C/Am",
  musicFunction: "Tonics",
  notesSet: "Major",

  setTuneKey: (tuneKey) => set({ tuneKey }),
  setMusicFunction: (musicFunction) => set({ musicFunction }),
  setNotesSet: (notesSets) => set({ notesSet: notesSets }),
}));

import { create } from "zustand";
import { MUSIC_FUCTIONS_NAMES, NOTES_FROM_C } from "../music-theory";

export const useMusicStore = create((set) => ({
  tuneKey: NOTES_FROM_C[0],
  musicFunction: MUSIC_FUCTIONS_NAMES[0],

  setTuneKey: (note) => set({ tuneKey: note }),
  setMusicFunction: (key) => set({ musicFunction: key }),
}));

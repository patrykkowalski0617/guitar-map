import { create } from "zustand";

export const useDevStore = create((set) => ({
  isProgressMode: false,
  toggleProgressMode: () =>
    set((state) => ({ isProgressMode: !state.isProgressMode })),
  isDevMode: false,
  toggleDevMode: () => set((state) => ({ isDevMode: !state.isDevMode })),
}));

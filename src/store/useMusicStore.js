import { create } from "zustand";
import { UNIFIED_MUSIC_KEYS } from "../data/data";
import {
  musicFunctionContextSelectorData,
  NEW_chordShapes,
} from "../data/data";
import { getNotesFromNote } from "../utils/getNotesFromNote";

export const useMusicStore = create((set, get) => ({
  // --- STAN ---
  tuneKey: UNIFIED_MUSIC_KEYS[0],
  activeMusicContext: musicFunctionContextSelectorData[0],
  activeShape: musicFunctionContextSelectorData[0].shapes[0],
  activeShapeName: "",

  // Stan wizualizacji na gryfie
  shape: [],
  variantState: { lastId: null, index: 0 },

  // --- POMOCNICZE ---
  getKeyNotes: (keyObj) => {
    const k = keyObj || get().tuneKey;
    return getNotesFromNote(k.majorNote);
  },

  // --- AKCJE RESETUJĄCE ---
  setShape: (newShape) => set({ shape: newShape }),
  setVariantState: (newState) => set({ variantState: newState }),

  // Funkcja czyszcząca widok gryfu
  resetShape: () =>
    set({ shape: [], variantState: { lastId: null, index: 0 } }),

  // --- AKCJE GŁÓWNE ---
  setTuneKey: (keyObject) => {
    // Przy zmianie tonacji również warto zresetować kształt,
    // bo nuty bazowe (RootNotes) się przesuwają
    get().resetShape();
    set({ tuneKey: keyObject });
  },

  setActiveShapeByName: (name) => {
    const { activeMusicContext, getKeyNotes } = get();
    const keyNotes = getKeyNotes();

    const foundShape = activeMusicContext?.shapes?.find((shape) => {
      const rootNote =
        shape.rootSemitone !== undefined
          ? keyNotes[shape.rootSemitone]
          : undefined;

      return shape.getNotesSetName(rootNote) === name;
    });

    if (foundShape) {
      // RESETUJEMY kształt przy zmianie konkretnego typu (np. z Major na Major7)
      get().resetShape();
      set({ activeShape: foundShape });
    }
  },

  setActiveMusicContextByName: (name) => {
    const newContext = musicFunctionContextSelectorData.find(
      (item) => item.FunctionContextName === name
    );
    if (newContext) {
      // RESETUJEMY kształt przy zmianie kontekstu (np. z Triads na Seventh Chords)
      get().resetShape();
      set({
        activeMusicContext: newContext,
        // Opcjonalnie: ustawiamy pierwszy kształt z nowej listy jako aktywny
        activeShape: newContext.shapes[0],
      });
    }
  },

  setActiveShapeName: (name) => set({ activeShapeName: name }),
  setActiveShape: (shapeObject) => set({ activeShape: shapeObject }),

  // --- GETTERY ---
  getActiveShapeRootNote: () => {
    const { activeShape, getKeyNotes } = get();
    if (!activeShape) return null;
    const keyNotes = getKeyNotes();
    if (activeShape.rootSemitone !== undefined) {
      return keyNotes[activeShape.rootSemitone];
    }
    return null;
  },

  getActiveChordVariants: () => {
    const { activeShape } = get();
    if (!activeShape || !activeShape.chordShapeId) return [];
    const chordGroup = NEW_chordShapes.find(
      (chord) => chord.id === activeShape.chordShapeId
    );
    return chordGroup ? chordGroup.shapes : [];
  },
}));

import { create } from "zustand";
import { musicFunctionContextSelectorData } from "../data/data";
import { enharmonicTransform, UNIFIED_MUSIC_KEYS } from "../data/notes";
import { getNotesFromNote } from "../utils/getNotesFromNote";
import { setsShapes } from "../data/setsShapes";

export const useStore = create((set, get) => ({
  tuneKey: UNIFIED_MUSIC_KEYS[0],
  activeMusicContext: musicFunctionContextSelectorData[0],
  activeShape: musicFunctionContextSelectorData[0].shapes[0],
  activeShapeName: "",

  shape: [],
  variantState: { lastId: null, index: 0 },

  getKeyNotes: (keyObj) => {
    const k = keyObj || get().tuneKey;
    return getNotesFromNote(k.majorNote);
  },

  setShape: (newShape) => set({ shape: newShape }),
  setVariantState: (newState) => set({ variantState: newState }),

  resetShape: () =>
    set({ shape: [], variantState: { lastId: null, index: 0 } }),

  setTuneKey: (keyObject) => {
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

      // TUTAJ POPRAWKA: Dodajemy enharmonicTransform, aby dopasować do tego, co widzi użytkownik
      const formattedName = enharmonicTransform(
        shape.getNotesSetName(rootNote)
      );
      return formattedName === name;
    });

    if (foundShape) {
      get().resetShape();
      set({ activeShape: foundShape });
    }
  },

  setActiveMusicContextByName: (name) => {
    const newContext = musicFunctionContextSelectorData.find(
      (item) => item.FunctionContextName === name
    );
    if (newContext) {
      get().resetShape();
      set({
        activeMusicContext: newContext,

        activeShape: newContext.shapes[0],
      });
    }
  },

  setActiveShapeName: (name) => set({ activeShapeName: name }),
  setActiveShape: (shapeObject) => set({ activeShape: shapeObject }),

  getNoteNameByOffset: (offset) => {
    const { getKeyNotes } = get();
    const notes = getKeyNotes();
    return notes[offset] || "";
  },
  getActiveShapeRootNote: () => {
    const { activeShape, getKeyNotes } = get();
    if (!activeShape) return null;
    const keyNotes = getKeyNotes();
    if (activeShape.rootSemitone !== undefined) {
      return keyNotes[activeShape.rootSemitone];
    }
    return null;
  },

  getActiveChordId: () => {
    return get().activeShape?.chordShapeId || null;
  },

  getActiveChordGroup: () => {
    const id = get().getActiveChordId();
    return setsShapes.find((chord) => chord.id === id) || null;
  },

  getActiveChordLabel: () => {
    return get().getActiveChordGroup()?.label || "";
  },

  setActiveChordId: (id) => {
    const { activeMusicContext } = get();

    const foundShape = activeMusicContext.shapes.find(
      (s) => s.chordShapeId === id
    );
    if (foundShape) {
      get().resetShape();
      set({ activeShape: foundShape });
    }
  },
  getActiveChordVariants: () => {
    const { activeShape } = get();
    if (!activeShape || !activeShape.chordShapeId) return [];
    const chordGroup = setsShapes.find(
      (chord) => chord.id === activeShape.chordShapeId
    );
    return chordGroup ? chordGroup.shapes : [];
  },

  mode: "Major",
  setMode: (newMode) => set({ mode: newMode }),

  // NOWA FUNKCJA: Dynamiczne pobieranie nazwy aktywnego kształtu
  getActiveShapeName: () => {
    const { activeShape, getKeyNotes } = get();
    if (!activeShape) return "";

    const keyNotes = getKeyNotes();
    const rootNote =
      activeShape.rootSemitone !== undefined
        ? keyNotes[activeShape.rootSemitone]
        : undefined;

    // Pobieramy nazwę z obiektu shape i transformujemy enharmonicznie
    const name = activeShape.getNotesSetName(rootNote);
    return enharmonicTransform(name);
  },

  // Pomocnicza funkcja do formatowania dowolnego kształtu (przydatne dla listy opcji)
  formatShapeName: (shape) => {
    if (!shape) return "";
    const keyNotes = get().getKeyNotes();
    const rootNote =
      shape.rootSemitone !== undefined
        ? keyNotes[shape.rootSemitone]
        : undefined;

    return enharmonicTransform(shape.getNotesSetName(rootNote));
  },
}));

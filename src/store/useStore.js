import { create } from "zustand";
import { musicFunctionContextSelectorData } from "../data/data";
import { enharmonicTransform, UNIFIED_MUSIC_KEYS } from "../data/notes";
import { getNotesFromNote } from "../utils/getNotesFromNote";
import { setsShapes } from "../data/setsShapes";

export const useStore = create((set, get) => ({
  // --- STATE ---
  tuneKey: UNIFIED_MUSIC_KEYS[0],
  activeMusicContext: musicFunctionContextSelectorData[0],
  activeShape: musicFunctionContextSelectorData[0].shapes[0],
  activeShapeName: "",
  shape: [],
  variantState: { lastId: null, index: 0 },
  mode: "Major",

  // --- GETTERS ---
  getKeyNotes: (keyObj) => {
    const k = keyObj || get().tuneKey;
    return getNotesFromNote(k.majorNote);
  },

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

  getActiveShapeName: () => {
    const { activeShape, getKeyNotes } = get();
    if (!activeShape) return "";

    const keyNotes = getKeyNotes();
    const rootNote =
      activeShape.rootSemitone !== undefined
        ? keyNotes[activeShape.rootSemitone]
        : undefined;

    const name = activeShape.getNotesSetName(rootNote);
    return enharmonicTransform(name);
  },

  formatShapeName: (shape) => {
    if (!shape) return "";
    const keyNotes = get().getKeyNotes();
    const rootNote =
      shape.rootSemitone !== undefined
        ? keyNotes[shape.rootSemitone]
        : undefined;

    return enharmonicTransform(shape.getNotesSetName(rootNote));
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

  getActiveChordVariants: () => {
    const { activeShape } = get();
    if (!activeShape || !activeShape.chordShapeId) return [];
    const chordGroup = setsShapes.find(
      (chord) => chord.id === activeShape.chordShapeId
    );
    return chordGroup ? chordGroup.shapes : [];
  },

  // --- ACTIONS ---
  setShape: (newShape) => set({ shape: newShape }),
  setVariantState: (newState) => set({ variantState: newState }),
  setMode: (newMode) => set({ mode: newMode }),

  resetShape: () =>
    set({ shape: [], variantState: { lastId: null, index: 0 } }),

  setTuneKey: (keyObject) => {
    get().resetShape();
    set({ tuneKey: keyObject });
  },

  setActiveShape: (shapeObject) => set({ activeShape: shapeObject }),
  setActiveShapeName: (name) => set({ activeShapeName: name }),

  setActiveMusicContextById: (id) => {
    const newContext = musicFunctionContextSelectorData.find(
      (item) => item.id === id
    );

    if (newContext) {
      get().resetShape();
      set({
        activeMusicContext: newContext,
        activeShape: newContext.shapes[0],
      });
    }
  },

  setActiveShapeById: (id) => {
    const { activeMusicContext } = get();
    if (!activeMusicContext) return;

    const foundShape = activeMusicContext.shapes.find((s) => s.id === id);

    if (foundShape) {
      get().resetShape();
      set({ activeShape: foundShape });
    }
  },

  getActiveShapeId: () => {
    return get().activeShape?.id || null;
  },
}));

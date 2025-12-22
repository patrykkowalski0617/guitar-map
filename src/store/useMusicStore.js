import { create } from "zustand";
import {
  notesSetsInFunctionContexts,
  UNIFIED_MUSIC_KEYS,
  getNotesStartingFrom, // Importujemy, aby Store sam generował skalę
} from "../music-theory";

export const useMusicStore = create((set, get) => ({
  tuneKey: UNIFIED_MUSIC_KEYS[0],

  // Helper do pobierania skali na podstawie aktualnego lub przekazanego tuneKey
  getKeyNotes: (keyObj) => {
    const k = keyObj || get().tuneKey;
    return getNotesStartingFrom(k.majorNote);
  },

  setTuneKey: (keyObject) => {
    const state = get();
    const currentActiveSet = state.getActiveNotesSet();

    // Generujemy nową skalę raz dla całej operacji
    const newKeyNotes = getNotesStartingFrom(keyObject.majorNote);
    const oldKeyNotes = state.getKeyNotes();

    if (currentActiveSet) {
      const newRenderedSetName = currentActiveSet.getNotesSetName(newKeyNotes);

      const currentActiveMarker = currentActiveSet.notesMarkers?.find(
        (m) => m.getMarkerName(oldKeyNotes) === state.selectedMarkerName
      );

      const newRenderedMarkerName = currentActiveMarker
        ? currentActiveMarker.getMarkerName(newKeyNotes)
        : "";

      set({
        tuneKey: keyObject,
        selectedNotesSetName: newRenderedSetName,
        selectedMarkerName: newRenderedMarkerName,
      });
    } else {
      set({ tuneKey: keyObject });
    }
  },

  selectedFunctionContext: notesSetsInFunctionContexts[0].FunctionContextName,

  // Inicjalizacja z użyciem skali
  selectedNotesSetName:
    notesSetsInFunctionContexts[0].notesSets[0].getNotesSetName(
      getNotesStartingFrom(UNIFIED_MUSIC_KEYS[0].majorNote)
    ),

  selectedMarkerName:
    notesSetsInFunctionContexts[0].notesSets[0].notesMarkers?.[0]?.getMarkerName(
      getNotesStartingFrom(UNIFIED_MUSIC_KEYS[0].majorNote)
    ) || "",

  setFunctionContextName: (name) => {
    const keyNotes = get().getKeyNotes();
    const newContext = notesSetsInFunctionContexts.find(
      (c) => c.FunctionContextName === name
    );
    const firstSet = newContext?.notesSets[0];

    set({
      selectedFunctionContext: name,
      selectedNotesSetName: firstSet ? firstSet.getNotesSetName(keyNotes) : "",
      selectedMarkerName:
        firstSet?.notesMarkers?.[0]?.getMarkerName(keyNotes) || "",
    });
  },

  setNotesSetName: (renderedName) => {
    const { selectedFunctionContext, getKeyNotes } = get();
    const keyNotes = getKeyNotes();
    const context = notesSetsInFunctionContexts.find(
      (c) => c.FunctionContextName === selectedFunctionContext
    );

    const newSet = context?.notesSets.find(
      (n) => n.getNotesSetName(keyNotes) === renderedName
    );

    set({
      selectedNotesSetName: renderedName,
      selectedMarkerName:
        newSet?.notesMarkers?.[0]?.getMarkerName(keyNotes) || "",
    });
  },

  setMarkerName: (renderedMarkerName) =>
    set({ selectedMarkerName: renderedMarkerName }),

  getActiveNotesSet: () => {
    const { selectedFunctionContext, selectedNotesSetName, getKeyNotes } =
      get();
    const keyNotes = getKeyNotes();
    const context = notesSetsInFunctionContexts.find(
      (c) => c.FunctionContextName === selectedFunctionContext
    );
    return context?.notesSets.find(
      (n) => n.getNotesSetName(keyNotes) === selectedNotesSetName
    );
  },

  getActiveMarker: () => {
    const { selectedMarkerName, getKeyNotes } = get();
    const keyNotes = getKeyNotes();
    const activeSet = get().getActiveNotesSet();

    return activeSet?.notesMarkers?.find(
      (m) => m.getMarkerName(keyNotes) === selectedMarkerName
    );
  },
}));

import { create } from "zustand";
import {
  notesSetsInFunctionContexts,
  UNIFIED_MUSIC_KEYS,
  // Import Twojego nowego obiektu
} from "../data/music-theory";
import {
  musicFunctionContextSelectorData,
  NEW_chordShapes, // Import Twojego nowego obiektu
} from "../data/shapes";
import { getNotesFromNote } from "../utils/getNotesFromNote";

export const useMusicStore = create((set, get) => ({
  // --- TWÓJ DOTYCHCZASOWY KOD (BEZ ZMIAN) ---
  tuneKey: UNIFIED_MUSIC_KEYS[0],
  getKeyNotes: (keyObj) => {
    const k = keyObj || get().tuneKey;
    return getNotesFromNote(k.majorNote);
  },
  setTuneKey: (keyObject) => {
    const state = get();
    const currentActiveSet = state.getActiveNotesSet();
    const newKeyNotes = getNotesFromNote(keyObject.majorNote);
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
  selectedNotesSetName:
    notesSetsInFunctionContexts[0].notesSets[0].getNotesSetName(
      getNotesFromNote(UNIFIED_MUSIC_KEYS[0].majorNote)
    ),
  selectedMarkerName:
    notesSetsInFunctionContexts[0].notesSets[0].notesMarkers?.[0]?.getMarkerName(
      getNotesFromNote(UNIFIED_MUSIC_KEYS[0].majorNote)
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

  // --- NEW SELECTOR LOGIC (DODANE) ---

  // Przechowuje aktualnie wybrany cały obiekt kontekstu (np. { FunctionContextName: "Tonics", shapes: [...] })
  activeMusicContext: musicFunctionContextSelectorData[0],
  // ... wewnątrz create w useMusicStore (na końcu)

  // Przechowuje cały obiekt kształtu, np. { getNotesSetName: ..., CAGED_rootNote: "C" }
  activeShape: musicFunctionContextSelectorData[0].shapes[0],

  setActiveShape: (shapeObject) => set({ activeShape: shapeObject }),

  // Pomocnicza akcja do ustawiania po nazwie (używana przez selektor)
  // Wewnątrz create w useMusicStore:

  setActiveShapeByName: (name) => {
    const { activeMusicContext, getKeyNotes } = get();
    const keyNotes = getKeyNotes();

    // Szukamy obiektu, którego nazwa (wygenerowana z konkretnej nuty)
    // zgadza się z tym, co przyszło z SegmentedSelect
    const foundShape = activeMusicContext?.shapes?.find((shape) => {
      const rootNote =
        shape.rootSemitone !== undefined
          ? keyNotes[shape.rootSemitone]
          : undefined;

      return shape.getNotesSetName(rootNote) === name;
    });

    if (foundShape) {
      set({ activeShape: foundShape });
    }
  },
  // Funkcja przełączająca między obiektami w array
  setActiveMusicContextByName: (name) => {
    const newContext = musicFunctionContextSelectorData.find(
      (item) => item.FunctionContextName === name
    );
    if (newContext) {
      set({ activeMusicContext: newContext });
    }
  },
  activeShapeName: "",
  setActiveShapeName: (name) => set({ activeShapeName: name }), // Wewnątrz create w useMusicStore:

  getActiveShapeRootNote: () => {
    const { activeShape, getKeyNotes } = get();

    // Jeśli nie ma wybranego kształtu, zwracamy null
    if (!activeShape) return null;

    // Pobieramy aktualną tablicę 12 nut (chromatyczną)
    const keyNotes = getKeyNotes();

    // Jeśli kształt ma zdefiniowany rootSemitone (np. 0, 9),
    // zwracamy nutę z tej pozycji. W przeciwnym razie null.
    if (activeShape.rootSemitone !== undefined) {
      return keyNotes[activeShape.rootSemitone];
    }

    return null;
  }, // Wewnątrz create w useMusicStore:

  getActiveChordVariants: () => {
    const { activeShape } = get();

    // Jeśli nie wybrano kształtu lub kształt nie ma powiązanego ID akordu
    if (!activeShape || !activeShape.chordShapeId) return [];

    // Szukamy grupy akordów w NEW_chordShapes
    const chordGroup = NEW_chordShapes.find(
      (chord) => chord.id === activeShape.chordShapeId
    );

    // Zwracamy tablicę wszystkich wariantów shapes [[...], [...]]
    return chordGroup ? chordGroup.shapes : [];
  },
}));

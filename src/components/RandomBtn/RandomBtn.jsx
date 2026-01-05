import { useStore } from "../../store/useStore";
import {
  NOTES_FROM_C,
  UNIFIED_MUSIC_KEYS,
  musicFunctionContextSelectorData,
} from "../../data";
import styled from "styled-components";
import { getNotesFromNote } from "../../utils";
import useFretboardLogic from "../Fretboard/hooks/useFretboardLogic";

const StyledRandomBtn = styled.button`
  padding: 10px 20px;
  color: black;
`;

const RandomChallengeButton = () => {
  const store = useStore();

  // Pobieramy logikę. UWAGA: aby to działało, hook musi reagować na zmiany w store.
  const fretboardLogic = useFretboardLogic({
    activeShapeRootNote: store.getActiveShapeRootNote(),
    activeChordVariants: store.getActiveChordVariants(),
    variantState: store.variantState,
    setVariantState: store.setVariantState,
    setShape: store.setShape,
    setLockedCAGEDLetter: store.setLockedCAGEDLetter,
    lockedCAGEDLetter: store.lockedCAGEDLetter,
  });

  const getAvailableRootIds = () => {
    const state = useStore.getState();
    const activeRoot = state.getActiveShapeRootNote();
    const tuneKey = state.tuneKey;
    const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
    const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
    const ALLOWED_STRINGS = ["E1", "A2", "D3"];

    const availableIds = [];
    STRINGS_FIRST_NOTES.forEach((string, sIdx) => {
      const stringId = `${string}${6 - sIdx}`;
      const fretCells = getNotesFromNote(string, 16);
      fretCells.forEach((note) => {
        if (note === activeRoot) {
          let index = NOTES_FROM_C.indexOf(note) - CAGED_shift;
          if (index < 0) index += 12;
          const CAGED_noteId = `${stringId}_${NOTES_FROM_C[index]}`;
          if (ALLOWED_STRINGS.includes(stringId)) {
            availableIds.push({ note, CAGED_noteId });
          }
        }
      });
    });
    return availableIds;
  };

  const executeChallengeStep = (stepNumber, contextData) => {
    // 1. Ustawienie kontekstu
    store.setActiveMusicContextById(contextData.id);

    // 2. Ustawienie kształtu
    const shapes = contextData.shapes;
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    store.setActiveShape(randomShape);

    // 3. Wymuszenie odczytu najświeższych danych ze Store tuż przed "kliknięciem"
    const freshState = useStore.getState();
    const freshVariants = freshState.getActiveChordVariants();
    const freshRoot = freshState.getActiveShapeRootNote();

    console.group(`🔍 SZCZEGÓŁY KROKU ${stepNumber}`);
    console.log("Wybrany Context:", contextData.id);
    console.log("Wybrany Shape:", randomShape.id);
    console.log("Fresh Root Note:", freshRoot);
    console.log("Fresh Variants Count:", freshVariants.length);

    const roots = getAvailableRootIds();

    if (roots.length > 0 && freshVariants.length > 0) {
      const target = roots[Math.floor(Math.random() * roots.length)];

      console.log("SYMULACJA KLIKU W:", target.CAGED_noteId);

      // Wywołujemy handleNoteClick
      fretboardLogic.handleNoteClick(target.note, target.CAGED_noteId);

      // LOG STANU PO KLIKNIĘCIU
      setTimeout(() => {
        const afterClickState = useStore.getState();
        console.log("Stan 'shape' w Store po kliku:", afterClickState.shape);
      }, 50);
    } else {
      console.error("BŁĄD: Brak warunków do kliknięcia!", {
        rootsCount: roots.length,
        variantsCount: freshVariants.length,
      });
    }
    console.groupEnd();
  };

  const handleRandomize = () => {
    console.clear();
    console.log("🚀 START: Nowe losowanie...");

    const randomKey =
      UNIFIED_MUSIC_KEYS[Math.floor(Math.random() * UNIFIED_MUSIC_KEYS.length)];
    store.setTuneKey(randomKey);

    const ctx1 =
      musicFunctionContextSelectorData[
        Math.floor(Math.random() * musicFunctionContextSelectorData.length)
      ];
    const ctx2 = musicFunctionContextSelectorData.filter(
      (c) => c.harmonicFunctionDescription !== ctx1.harmonicFunctionDescription
    )[0];

    // Pierwszy krok wykonujemy natychmiast
    executeChallengeStep(1, ctx1);

    // Drugi po sekundzie
    setTimeout(() => {
      executeChallengeStep(2, ctx2);
    }, 1000);
  };

  return (
    <StyledRandomBtn onClick={handleRandomize} style={{ height: "200px" }}>
      LOSUJ I LOGUJ
    </StyledRandomBtn>
  );
};

export default RandomChallengeButton;

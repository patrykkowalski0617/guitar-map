import { useStore } from "../../store/useStore";
import {
  NOTES_FROM_C,
  UNIFIED_MUSIC_KEYS,
  musicFunctionContextSelectorData,
} from "../../data";
import styled from "styled-components";
import { getNotesFromNote } from "../../utils";
import useFretboardLogic from "../Fretboard/hooks/useFretboardLogic";
import { useRef, useEffect } from "react";

const StyledRandomBtn = styled.button`
  padding: 10px 20px;
  color: black;
  cursor: pointer;
`;

const RandomChallengeButton = () => {
  const store = useStore();

  // Używamy referencji, aby bot zawsze miał dostęp do najświeższej logiki
  // nawet wewnątrz starych cykli setTimeout/async
  const logicRef = useRef(null);

  const fretboardLogic = useFretboardLogic({
    activeShapeRootNote: store.getActiveShapeRootNote(),
    activeChordVariants: store.getActiveChordVariants(),
    variantState: store.variantState,
    setVariantState: store.setVariantState,
    setShape: store.setShape,
    setLockedCAGEDLetter: store.setLockedCAGEDLetter,
    lockedCAGEDLetter: store.lockedCAGEDLetter,
  });

  // Aktualizujemy referencję przy każdym renderze
  useEffect(() => {
    logicRef.current = fretboardLogic;
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

  const executeChallengeStep = async (
    stepNumber,
    contextData,
    isFirstStep = false
  ) => {
    console.group(`🚀 KROK ${stepNumber}`);

    // 1. Ustawienie kontekstu
    store.setActiveMusicContextById(contextData.id);
    const shapes = contextData.shapes;
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    store.setActiveShape(randomShape);

    // Czekamy na przeliczenie wariantów w Store
    await new Promise((r) => setTimeout(r, 150));

    const freshState = useStore.getState();
    const freshVariants = freshState.getActiveChordVariants();
    const roots = getAvailableRootIds();

    if (roots.length > 0 && freshVariants.length > 0) {
      const target = roots[Math.floor(Math.random() * roots.length)];
      const stringId = target.CAGED_noteId.split("_")[0];
      const variantsOnString = freshVariants.filter(
        (v) => v.targetString === stringId
      );

      console.log(
        `🎯 Target: ${target.CAGED_noteId} | Dostępnych wariantów: ${variantsOnString.length}`
      );

      // PIERWSZY KLIK - używamy referencji, która zawsze jest świeża
      logicRef.current.handleNoteClick(target.note, target.CAGED_noteId);

      // JEŚLI KROK 1: Przełączamy warianty
      if (isFirstStep && variantsOnString.length > 1) {
        const extraClicks = Math.floor(Math.random() * variantsOnString.length);
        if (extraClicks > 0) {
          console.log(
            `🎲 Przełączam warianty: dodatkowe ${extraClicks} kliknięcia...`
          );
          for (let i = 0; i < extraClicks; i++) {
            // Czekamy na rerender Reacta po każdym kliku
            await new Promise((r) => setTimeout(r, 150));
            logicRef.current.handleNoteClick(target.note, target.CAGED_noteId);
          }
        }
      }

      // Weryfikacja
      setTimeout(() => {
        const final = useStore.getState();
        console.log(`✅ Wynik K${stepNumber}:`, {
          variant: final.variantState?.variantId,
          notes: final.shape?.length,
        });
        console.groupEnd();
      }, 200);
    } else {
      console.error("❌ BŁĄD: Brak danych do kliknięcia");
      console.groupEnd();
    }
  };

  const handleRandomize = async () => {
    console.clear();
    console.log("💎 START SESJI BOTA");

    const randomKey =
      UNIFIED_MUSIC_KEYS[Math.floor(Math.random() * UNIFIED_MUSIC_KEYS.length)];
    store.setTuneKey(randomKey);

    const ctx1 =
      musicFunctionContextSelectorData[
        Math.floor(Math.random() * musicFunctionContextSelectorData.length)
      ];
    const ctx2 = musicFunctionContextSelectorData.find((c) => c.id !== ctx1.id);

    // Wykonujemy kroki sekwencyjnie
    await executeChallengeStep(1, ctx1, true);

    setTimeout(async () => {
      await executeChallengeStep(2, ctx2, false);
    }, 1200);
  };

  return (
    <StyledRandomBtn onClick={handleRandomize} style={{ height: "50px" }}>
      START: LOSUJ WYZWANIE
    </StyledRandomBtn>
  );
};

export default RandomChallengeButton;

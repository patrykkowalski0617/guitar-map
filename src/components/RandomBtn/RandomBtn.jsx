import { useStore } from "../../store/useStore";
import {
  NOTES_FROM_C,
  UNIFIED_MUSIC_KEYS,
  musicFunctionContextSelectorData,
} from "../../data";
import { getNotesFromNote } from "../../utils";
import useFretboardLogic from "../Fretboard/hooks/useFretboardLogic";
import { useRef, useEffect } from "react";
import { HeaderButton } from "../FretboardHeader/parts";

const RandomChallengeButton = () => {
  const store = useStore();
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

  const executeChallengeStep = async (contextData) => {
    store.setActiveMusicContextById(contextData.id);
    const shapes = contextData.shapes;
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    store.setActiveShape(randomShape);

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

      logicRef.current.handleNoteClick(target.note, target.CAGED_noteId);

      if (variantsOnString.length > 1) {
        const extraClicks = Math.floor(Math.random() * variantsOnString.length);
        if (extraClicks > 0) {
          for (let i = 0; i < extraClicks; i++) {
            await new Promise((r) => setTimeout(r, 350));
            logicRef.current.handleNoteClick(target.note, target.CAGED_noteId);
          }
        }
      }
    }
  };

  const handleRandomize = async () => {
    const randomKey =
      UNIFIED_MUSIC_KEYS[Math.floor(Math.random() * UNIFIED_MUSIC_KEYS.length)];
    store.setTuneKey(randomKey);

    const ctx1 =
      musicFunctionContextSelectorData[
        Math.floor(Math.random() * musicFunctionContextSelectorData.length)
      ];

    await executeChallengeStep(ctx1);
  };

  return <HeaderButton onClick={handleRandomize}>Random shape</HeaderButton>;
};

export default RandomChallengeButton;

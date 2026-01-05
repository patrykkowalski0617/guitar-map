import { useStore } from "../../store/useStore";
import {
  NOTES_FROM_C,
  UNIFIED_MUSIC_KEYS,
  musicFunctionContextSelectorData,
} from "../../data";
import { getNotesFromNote } from "../../utils";
import useFretboardLogic from "../Fretboard/hooks/useFretboardLogic";
import { useRef, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { HeaderButton } from "../FretboardHeader/parts";

const pulse = (color) => keyframes`
  0% {
    border-color: ${color}99;
    box-shadow: 0 0 0px ${color}00;
  }
  50% {
    border-color: ${color};
    box-shadow: 0 0 10px 2px ${color}; 
  }
  100% {
    border-color: ${color}99;
    box-shadow: 0 0 0px ${color}00;
  }
`;

const StyledButton = styled(HeaderButton)`
  animation: ${({ theme }) => pulse(theme.colors.alert)} 1s forwards ease-in-out;
  ${({ $isRandomizing, theme }) =>
    $isRandomizing &&
    css`
      pointer-events: none;
      color: ${theme.colors.text} !important;
      animation: ${pulse(theme.colors.alert)} 1s infinite ease-in-out !important;
      &:hover {
        box-shadow: none !important;
      }
    `}
`;

const RandomChallengeButton = () => {
  const store = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleRandomize = async () => {
    setIsProcessing(true);
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    try {
      const randomKey =
        UNIFIED_MUSIC_KEYS[
          Math.floor(Math.random() * UNIFIED_MUSIC_KEYS.length)
        ];
      store.setTuneKey(randomKey);

      await delay(800);

      const ctx =
        musicFunctionContextSelectorData[
          Math.floor(Math.random() * musicFunctionContextSelectorData.length)
        ];
      store.setActiveMusicContextById(ctx.id);

      await delay(800);

      const shapes = ctx.shapes;
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      store.setActiveShape(randomShape);

      await delay(800);

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
          const extraClicks = Math.floor(
            Math.random() * variantsOnString.length
          );
          if (extraClicks > 0) {
            let baseDelay = 400;
            for (let i = 0; i < extraClicks; i++) {
              const incrementalDelay = baseDelay + i * 400;
              await delay(incrementalDelay);
              logicRef.current.handleNoteClick(
                target.note,
                target.CAGED_noteId
              );
            }
          }
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <StyledButton $isRandomizing={isProcessing} onClick={handleRandomize}>
      {isProcessing ? "Randomizing..." : "Get random shape"}
    </StyledButton>
  );
};

export default RandomChallengeButton;

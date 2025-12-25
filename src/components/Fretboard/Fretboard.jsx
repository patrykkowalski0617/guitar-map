import { useState } from "react";
import { useMusicStore } from "../../store/useMusicStore";
import manageCAGED from "../../utils/manageCAGED";
import { FretboardContainer } from "./parts";
import { CAGEDshapes } from "../../data/data";
import FretRow from "./FretRow";
import FretboardLabels from "./FretboardLabels";
import CopyUserShapeButton from "./CopyUserShapeButton";
import { isTestMode } from "../../settings";
import { getNotesFromNote } from "../../utils/getNotesFromNote";
import { NOTES_FROM_C } from "../../data/data";
import { transposeShape } from "../../utils/transposer";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const numberOfFrets = 16;

const Fretboard = () => {
  const {
    tuneKey,
    getActiveChordVariants,
    getActiveShapeRootNote,
    // Pobieramy stan i akcje ze store
    shape,
    setShape,
    variantState,
    setVariantState,
  } = useMusicStore();

  const [userShape, setUserShape] = useState([]);

  const fretCounts = getNotesFromNote("E", numberOfFrets).fill(null);
  const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
  const CAGED = manageCAGED(tuneKey.majorNote, CAGED_shift);
  const activeChordVariants = getActiveChordVariants();
  const activeShapeRootNote = getActiveShapeRootNote();

  const handleNoteClick = (note, CAGED_noteId) => {
    if (isTestMode) {
      setUserShape((prevShape) =>
        prevShape.includes(CAGED_noteId)
          ? prevShape.filter((id) => id !== CAGED_noteId)
          : [...prevShape, CAGED_noteId]
      );
    }

    if (activeShapeRootNote === note && activeChordVariants.length > 0) {
      let nextIndex = 0;

      // Korzystamy z globalnego variantState
      if (variantState.lastId === CAGED_noteId) {
        nextIndex = (variantState.index + 1) % activeChordVariants.length;
      }

      const selectedVariant = activeChordVariants[nextIndex];
      const newShape = transposeShape(selectedVariant, CAGED_noteId);

      setShape(newShape);
      setVariantState({
        lastId: CAGED_noteId,
        index: nextIndex,
      });
    }
  };

  const handleCAGEDClick = (cagedLetter) => {
    // Resetujemy stan wariantów globalnie
    setVariantState({ lastId: null, index: 0 });
    if (cagedLetter) {
      setShape(CAGEDshapes[cagedLetter]);
    } else {
      setShape([]);
    }
  };

  const handleClearUserShape = () => {
    setUserShape([]);
  };

  return (
    <>
      <FretboardContainer>
        {STRINGS_FIRST_NOTES.map((string, sIdx) => (
          <FretRow
            key={string + sIdx}
            string={string}
            sIdx={sIdx}
            numberOfFrets={numberOfFrets}
            CAGED_shift={CAGED_shift}
            handleNoteClick={handleNoteClick}
            shape={shape} // pochodzi ze store
            userShape={userShape}
            activeShapeRootNote={activeShapeRootNote}
          />
        ))}
        <FretboardLabels
          fretCounts={fretCounts}
          CAGED={CAGED}
          handleCAGEDClick={handleCAGEDClick}
        />
      </FretboardContainer>
      {isTestMode && (
        <CopyUserShapeButton
          userShape={userShape}
          handleClearUserShape={handleClearUserShape}
        />
      )}
    </>
  );
};

export default Fretboard;

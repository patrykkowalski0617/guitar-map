import { useState } from "react";
import { useStore } from "../../store/useStore";
import manageCAGED from "../../utils/manageCAGED";
import { FretboardContainer } from "./parts";
import { CAGEDshapes } from "../../data/data";
import FretRow from "./FretRow";
import FretboardLabels from "./FretboardLabels";
import { isDevMode } from "../../settings";
import { getNotesFromNote } from "../../utils/getNotesFromNote";
import { NOTES_FROM_C } from "../../data/notes";
import { transposeShape } from "../../utils/transposer";
import DevTools from "../devTooles/DevTools";
import { SubsectionTitle } from "../../parts";

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
  } = useStore();

  const [userShape, setUserShape] = useState([]);

  const fretCounts = getNotesFromNote("E", numberOfFrets).fill(null);
  const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
  const CAGED = manageCAGED(tuneKey.majorNote, CAGED_shift);
  const activeChordVariants = getActiveChordVariants();
  const activeShapeRootNote = getActiveShapeRootNote();

  const handleNoteClick = (note, CAGED_noteId) => {
    if (isDevMode) {
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
      <SubsectionTitle>Shapes on Fretboard</SubsectionTitle>
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
      {isDevMode && (
        <DevTools
          userShape={userShape}
          handleClearUserShape={handleClearUserShape}
        />
      )}
    </>
  );
};

export default Fretboard;

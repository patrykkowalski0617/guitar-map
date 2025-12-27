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
import ScrollFader from "../ScrollFader/ScrollFader";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const numberOfFrets = 16;

const Fretboard = () => {
  // ... (cała logika store i handlerów pozostaje bez zmian)
  const {
    tuneKey,
    getActiveChordVariants,
    getActiveShapeRootNote,
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
    // ... (logika handleNoteClick)
    if (isDevMode) {
      setUserShape((prevShape) =>
        prevShape.includes(CAGED_noteId)
          ? prevShape.filter((id) => id !== CAGED_noteId)
          : [...prevShape, CAGED_noteId]
      );
    }

    if (activeShapeRootNote === note && activeChordVariants.length > 0) {
      let nextIndex = 0;
      if (variantState.lastId === CAGED_noteId) {
        nextIndex = (variantState.index + 1) % activeChordVariants.length;
      }
      const selectedVariant = activeChordVariants[nextIndex];
      const newShape = transposeShape(selectedVariant, CAGED_noteId);
      setShape(newShape);
      setVariantState({ lastId: CAGED_noteId, index: nextIndex });
    }
  };

  const handleCAGEDClick = (cagedLetter) => {
    setVariantState({ lastId: null, index: 0 });
    if (cagedLetter) {
      setShape(CAGEDshapes[cagedLetter]);
    } else {
      setShape([]);
    }
  };

  const handleClearUserShape = () => setUserShape([]);

  return (
    <>
      <SubsectionTitle>Shapes on Fretboard</SubsectionTitle>

      {/* Owijamy gryf faderem. 
          Nie podajemy activeValue, bo gryf zazwyczaj nie musi 
          automatycznie centrować się na konkretnej nucie przy zmianie kształtu 
          (mogłoby to być dezorientujące dla użytkownika).
      */}
      <ScrollFader>
        <FretboardContainer>
          {STRINGS_FIRST_NOTES.map((string, sIdx) => (
            <FretRow
              key={string + sIdx}
              string={string}
              sIdx={sIdx}
              numberOfFrets={numberOfFrets}
              CAGED_shift={CAGED_shift}
              handleNoteClick={handleNoteClick}
              shape={shape}
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
      </ScrollFader>

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

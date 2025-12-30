import { useState } from "react";
import { useStore } from "../../store/useStore";
import manageCAGED from "../../utils/manageCAGED";
import { FretboardContainer } from "./parts";
import FretRow from "./FretRow";
import FretboardLabels from "./FretboardLabels";
import { isDevMode } from "../../settings";
import { getNotesFromNote } from "../../utils/getNotesFromNote";
import { NOTES_FROM_C } from "../../data/notes";
import { transposeShape } from "../../utils/transposer";
import DevTools from "../devTooles/DevTools";
import ScrollFader from "../ScrollFader/ScrollFader";
import { CAGED_hoverShapes } from "../../data/data";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const numberOfFrets = 16;

const Fretboard = () => {
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
  const [CAGED_hoverShape, setCAGED_hoverShape] = useState([]);

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
      // 1. Wyciągamy ID struny (np. "E1", "A") z CAGED_noteId (np. "E1_A")
      const stringId = CAGED_noteId.split("_")[0];

      let nextIndex = 0;
      // Jeśli klikamy w to samo miejsce, zaczynamy szukać od następnego wariantu
      if (variantState.lastId === CAGED_noteId) {
        nextIndex = (variantState.index + 1) % activeChordVariants.length;
      }

      // 2. Szukamy wariantu, który jest dozwolony na tej strunie
      let selectedVariant = activeChordVariants[nextIndex];
      let safetyCounter = 0;

      // Pętla sprawdza, czy struna jest na "czarnej liście" wariantu
      // Wykonuje się maksymalnie tyle razy, ile mamy wariantów (safety check)
      while (
        selectedVariant.notAllowedOnStrings?.includes(stringId) &&
        safetyCounter < activeChordVariants.length
      ) {
        nextIndex = (nextIndex + 1) % activeChordVariants.length;
        selectedVariant = activeChordVariants[nextIndex];
        safetyCounter++;
      }

      // 3. Jeśli po sprawdzeniu wszystkich wariantów nadal trafiamy na zakazany,
      // możemy przerwać transpozycję (opcjonalnie)
      if (selectedVariant.notAllowedOnStrings?.includes(stringId)) {
        console.warn(`No valid variant found for string: ${stringId}`);
        return;
      }

      const newShape = transposeShape(selectedVariant.shape, CAGED_noteId);

      setShape(newShape);
      setVariantState({ lastId: CAGED_noteId, index: nextIndex });
    }
  };

  const handleCAGED_MouseOver = (cagedLetter) => {
    setVariantState({ lastId: null, index: 0 });
    setCAGED_hoverShape(CAGED_hoverShapes[cagedLetter]);
  };

  const handleCAGED_MouseLeave = () => {
    setCAGED_hoverShape([]);
  };

  const handleClearUserShape = () => setUserShape([]);

  return (
    <>
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
              CAGED_hoverShape={CAGED_hoverShape}
              userShape={userShape}
              activeShapeRootNote={activeShapeRootNote}
            />
          ))}
          <FretboardLabels
            fretCounts={fretCounts}
            CAGED={CAGED}
            handleCAGED_MouseOver={handleCAGED_MouseOver}
            handleCAGED_MouseLeave={handleCAGED_MouseLeave}
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

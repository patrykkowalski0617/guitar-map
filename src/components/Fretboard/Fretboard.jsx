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
  const [lockedCAGEDLetter, setLockedCAGEDLetter] = useState(null);

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
      const stringId = CAGED_noteId.split("_")[0];
      let nextIndex = 0;

      if (variantState.lastId === CAGED_noteId) {
        nextIndex = (variantState.index + 1) % activeChordVariants.length;
      }

      let selectedVariant = activeChordVariants[nextIndex];
      let safetyCounter = 0;

      while (
        selectedVariant.notAllowedOnStrings?.includes(stringId) &&
        safetyCounter < activeChordVariants.length
      ) {
        nextIndex = (nextIndex + 1) % activeChordVariants.length;
        selectedVariant = activeChordVariants[nextIndex];
        safetyCounter++;
      }

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
    if (lockedCAGEDLetter) return;
    setVariantState({ lastId: null, index: 0 });
    setCAGED_hoverShape(CAGED_hoverShapes[cagedLetter]);
  };

  const handleCAGED_MouseLeave = () => {
    if (lockedCAGEDLetter) return;
    setCAGED_hoverShape([]);
  };

  const handleCAGED_Click = (cagedLetter) => {
    setVariantState({ lastId: null, index: 0 });

    if (lockedCAGEDLetter === cagedLetter) {
      setLockedCAGEDLetter(null);
      setCAGED_hoverShape([]);
    } else {
      setLockedCAGEDLetter(cagedLetter);
      setCAGED_hoverShape(CAGED_hoverShapes[cagedLetter]);
    }
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
            handleCAGED_Click={handleCAGED_Click}
            lockedCAGEDLetter={lockedCAGEDLetter}
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

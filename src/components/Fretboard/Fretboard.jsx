import { useState } from "react";
import { useMusicStore } from "../../store/useMusicStore";
import manageCAGED from "../../utils/manageCAGED";
import { FretboardContainer, StyledButton } from "./parts";
import { CAGEDshapes } from "../../data/shapes";
import FretRow from "./FretRow";
import FretboardLabels from "./FretboardLabels";
import CopyUserShapeButton from "./CopyUserShapeButton";
import { isTestMode } from "../../settings";
import { getNotesFromNote } from "../../utils/getNotesFromNote";
import { NOTES_FROM_C } from "../../data/music-theory";
import { transposeShape } from "../../utils/NEW_transposer";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const numberOfFrets = 16;

const Fretboard = () => {
  const {
    getActiveNotesSet,
    tuneKey,
    getActiveChordVariants,
    activeShape,
    getActiveShapeRootNote,
  } = useMusicStore();
  const [shape, setShape] = useState([]);
  const [userShape, setUserShape] = useState([]);

  const activeSet = getActiveNotesSet();
  const notesOfKey = getNotesFromNote(tuneKey.majorNote);

  const findNotes = (set) => {
    if (!set?.notesSets?.template) return [];
    const template = set.notesSets.template.map((el) => el[0]);
    const startingPoint = set.keyDegree[0];
    const doubledScale = [...notesOfKey, ...notesOfKey];
    return template.map((index) => doubledScale[index + startingPoint]);
  };

  const notesSet = findNotes(activeSet);
  const fretCounts = getNotesFromNote("E", numberOfFrets).fill(null);
  const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
  const CAGED = manageCAGED(tuneKey.majorNote, CAGED_shift);
  const activeChordVariants = getActiveChordVariants(); // Pobieramy activeShape i ewentualnie getKeyNotes do nazw
  const activeShapeRootNote = getActiveShapeRootNote();

  const handleNoteClick = (note, CAGED_noteId) => {
    if (isTestMode) {
      setUserShape((prevShape) =>
        prevShape.includes(CAGED_noteId)
          ? prevShape.filter((id) => id !== CAGED_noteId)
          : [...prevShape, CAGED_noteId]
      );
    }

    console.log({ activeChordVariants, activeShape, activeShapeRootNote });
    if (activeShapeRootNote === note) {
      const shape = transposeShape(activeChordVariants[0], CAGED_noteId);
      setShape(shape);
    }
  };

  const handleCAGEDClick = (cagedLetter) => {
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
            notesSet={notesSet}
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

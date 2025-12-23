import { useState } from "react";
import { getNotesStartingFrom, NOTES_FROM_C } from "../../data/music-theory";
import { useMusicStore } from "../../store/useMusicStore";
import manageCAGED from "../../utils/manageCAGED";
import { FretboardContainer } from "./parts";
import { shapes } from "../../data/shapes";
import FretRow from "./FretRow";
import FretboardLabels from "./FretboardLabels";
import CopyUserShapeButton from "./CopyUserShapeButton";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const extendFretboardBy = 3;

const extendArray = (arr, count = extendFretboardBy) => {
  const elementsToAppend = arr.slice(0, count);
  return [...arr, ...elementsToAppend];
};

const Fretboard = () => {
  const { getActiveNotesSet, tuneKey, getActiveMarker } = useMusicStore();
  const [shape, setShape] = useState([]);
  const [userShape, setUserShape] = useState([]);

  const activeSet = getActiveNotesSet();
  const activeMarker = getActiveMarker();
  const notesOfKey = getNotesStartingFrom(tuneKey.majorNote);

  const findNotes = (set) => {
    if (!set?.notesSets?.template) return [];
    const template = set.notesSets.template.map((el) => el[0]);
    const startingPoint = set.keyDegree[0];
    const doubledScale = [...notesOfKey, ...notesOfKey];
    return template.map((index) => doubledScale[index + startingPoint]);
  };

  const notesSet = findNotes(activeSet);
  const activeMarkerNote = notesOfKey[activeMarker.keyDegree[0]];
  const fretCounts = extendArray(getNotesStartingFrom("E")).fill(null);
  const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
  const CAGED = manageCAGED(tuneKey.majorNote, CAGED_shift);

  const handleNoteClick = (CAGED_noteId) => {
    setUserShape((prevShape) =>
      prevShape.includes(CAGED_noteId)
        ? prevShape.filter((id) => id !== CAGED_noteId)
        : [...prevShape, CAGED_noteId]
    );
  };

  const handleCAGEDClick = (cagedLetter) => {
    if (cagedLetter) {
      setShape(shapes[cagedLetter]);
    } else {
      setShape([]);
    }
  };

  return (
    <>
      <FretboardContainer>
        {STRINGS_FIRST_NOTES.map((string, sIdx) => (
          <FretRow
            key={string + sIdx}
            string={string}
            sIdx={sIdx}
            extendArray={extendArray}
            notesSet={notesSet}
            activeMarkerNote={activeMarkerNote}
            CAGED_shift={CAGED_shift}
            handleNoteClick={handleNoteClick}
            shape={shape}
            userShape={userShape}
          />
        ))}

        <FretboardLabels
          fretCounts={fretCounts}
          CAGED={CAGED}
          handleCAGEDClick={handleCAGEDClick}
        />
      </FretboardContainer>
      <CopyUserShapeButton userShape={userShape} />
    </>
  );
};

export default Fretboard;

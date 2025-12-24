import { useState } from "react";
import { useMusicStore } from "../../store/useMusicStore";
import manageCAGED from "../../utils/manageCAGED";
import { FretboardContainer, StyledButton } from "./parts";
import { CAGEDshapes, getShapesByInterval } from "../../data/shapes";
import FretRow from "./FretRow";
import FretboardLabels from "./FretboardLabels";
import CopyUserShapeButton from "./CopyUserShapeButton";
import { transposeShape } from "../../utils/transposer";
import { isTestMode } from "../../settings";
import { getNotesFromNote } from "../../utils/getNotesFromNote";
import { NOTES_FROM_C } from "../../data/music-theory";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const numberOfFrets = 16;

const Fretboard = () => {
  const { getActiveNotesSet, tuneKey, getActiveMarker } = useMusicStore();
  const [shape, setShape] = useState([]);
  const [userShape, setUserShape] = useState([]);
  const [currentShapeVariant, setCurrentShapeVariant] = useState(0);

  const activeSet = getActiveNotesSet();
  const activeMarker = getActiveMarker();
  const notesOfKey = getNotesFromNote(tuneKey.majorNote);

  const findNotes = (set) => {
    if (!set?.notesSets?.template) return [];
    const template = set.notesSets.template.map((el) => el[0]);
    const startingPoint = set.keyDegree[0];
    const doubledScale = [...notesOfKey, ...notesOfKey];
    return template.map((index) => doubledScale[index + startingPoint]);
  };

  const notesSet = findNotes(activeSet);
  const activeMarkerNote = notesOfKey[activeMarker.keyDegree[0]];
  const fretCounts = getNotesFromNote("E", numberOfFrets).fill(null);
  const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
  const CAGED = manageCAGED(tuneKey.majorNote, CAGED_shift);

  const handleNoteClick = (CAGED_noteId) => {
    if (isTestMode) {
      setUserShape((prevShape) =>
        prevShape.includes(CAGED_noteId)
          ? prevShape.filter((id) => id !== CAGED_noteId)
          : [...prevShape, CAGED_noteId]
      );
    }
    const CAGED_note = CAGED_noteId.split("_")[1];
    const CAGED_interval = NOTES_FROM_C.indexOf(CAGED_note);
    const shapesAvailableForThisNote = getShapesByInterval(CAGED_interval);
    const activeSet = getActiveNotesSet();
    console.log({ shapesAvailableForThisNote, activeSet });

    setShape(
      transposeShape(
        shapesAvailableForThisNote[0].shapes[currentShapeVariant],
        CAGED_noteId
      )
    );
    setCurrentShapeVariant((prev) => {
      if (prev >= shapesAvailableForThisNote[0].shapes.length) return 0;
      return prev + 1;
    });
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

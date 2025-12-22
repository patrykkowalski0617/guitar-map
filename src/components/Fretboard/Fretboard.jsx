import { useState } from "react";
import { getNotesStartingFrom, NOTES_FROM_C } from "../../data//music-theory";
import { useMusicStore } from "../../store/useMusicStore";
import manageCAGED from "../../utils/manageCAGED";
import { toRoman } from "../../utils/toRoman";
import Note from "./Note";
import { FretboardContainer, FretCell, FretCount, StringRow } from "./parts";
import DownloadJSON from "./DownloadJSON";
import { shapes } from "../../data/shapes";

const STRINGS = ["E", "B", "G", "D", "A", "E"];
const extendFretboardBy = 3;

const extendArray = (arr, count = extendFretboardBy) => {
  const elementsToAppend = arr.slice(0, count);
  return [...arr, ...elementsToAppend];
};

const Fretboard = () => {
  const { getActiveNotesSet, tuneKey, getActiveMarker } = useMusicStore();
  const [shape, setShape] = useState([]);
  const [isCAGEDShapeType, setIsShapeType] = useState(false);

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
    setShape((prevShape) =>
      prevShape.includes(CAGED_noteId)
        ? prevShape.filter((id) => id !== CAGED_noteId)
        : [...prevShape, CAGED_noteId]
    );
  };

  const handleCAGEDClick = (cagedLetter) => {
    if (cagedLetter) {
      setShape(shapes[cagedLetter]);
      setIsShapeType(true);
    } else {
      setShape([]);
      setIsShapeType(false);
    }
  };

  return (
    <>
      <FretboardContainer>
        {STRINGS.map((string, sIdx) => {
          const stringId = `${string}${6 - sIdx}`;
          const fretCells = extendArray(getNotesStartingFrom(string));

          return (
            <StringRow key={stringId}>
              {fretCells.map((note, fIdx) => {
                const fretId = `fret-${fIdx}`;
                const $isInSet = notesSet.includes(note);
                const $activeMarkerNote = activeMarkerNote === note;
                const get_CAGED_noteId = () => {
                  let index = NOTES_FROM_C.indexOf(note) - CAGED_shift;
                  if (index < 0) {
                    index += 11;
                  }
                  return `${stringId}_${NOTES_FROM_C[index]}`;
                };
                const CAGED_noteId = get_CAGED_noteId();
                return (
                  <FretCell
                    $numOfCells={fretCells.length}
                    key={`${stringId}-${fretId}`}
                  >
                    <Note
                      note={note}
                      stringId={stringId}
                      fretId={fretId}
                      $isInSet={$isInSet}
                      $activeMarkerNote={$activeMarkerNote}
                      CAGED_noteId={CAGED_noteId}
                      isCAGEDShapeType={isCAGEDShapeType}
                      handleClick={() => {
                        handleNoteClick(CAGED_noteId);
                      }}
                      $isSelected={shape.includes(CAGED_noteId)}
                    />
                  </FretCell>
                );
              })}
            </StringRow>
          );
        })}

        <StringRow>
          {fretCounts.map((_, fIdx) => {
            const cagedLetter = Object.keys(CAGED).find((key) =>
              CAGED[key].includes(fIdx)
            );

            return (
              <FretCount
                key={`fret-count-${fIdx}`}
                $numOfCells={fretCounts.length}
                onClick={() => {
                  handleCAGEDClick(cagedLetter);
                }}
              >
                {cagedLetter ? (
                  <span
                    style={{
                      color: "#ffcc00",
                    }}
                  >
                    {cagedLetter}
                  </span>
                ) : (
                  toRoman(fIdx)
                )}
              </FretCount>
            );
          })}
        </StringRow>
      </FretboardContainer>
      <DownloadJSON shape={shape} />
    </>
  );
};

export default Fretboard;

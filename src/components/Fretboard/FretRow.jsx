import { getNotesStartingFrom, NOTES_FROM_C } from "../../data/music-theory";
import { FretCell, StringRow, Note } from "./parts";

const FretRow = ({
  string,
  sIdx,
  extendArray,
  notesSet,
  activeMarkerNote,
  CAGED_shift,
  handleNoteClick,
  shape,
  isCAGEDShapeType,
}) => {
  const stringId = `${string}${6 - sIdx}`;
  const fretCells = extendArray(getNotesStartingFrom(string));

  return (
    <StringRow>
      {fretCells.map((note, fIdx) => {
        const fretId = `fret-${fIdx}`;
        const $isInSet = notesSet.includes(note);
        const $activeMarkerNote = activeMarkerNote === note;

        const get_CAGED_noteId = () => {
          let index = NOTES_FROM_C.indexOf(note) - CAGED_shift;
          if (index < 0) index += 11;
          return `${stringId}_${NOTES_FROM_C[index]}`;
        };

        const CAGED_noteId = get_CAGED_noteId();

        return (
          <FretCell
            $numOfCells={fretCells.length}
            key={`${stringId}-${fretId}`}
          >
            <Note
              $isInSet={$isInSet}
              $activeMarkerNote={$activeMarkerNote}
              onClick={() => handleNoteClick(CAGED_noteId)}
              $isSelected={shape.includes(CAGED_noteId)}
              className={`CAGED_noteId__${CAGED_noteId}`}
              $isCAGEDShapeType={isCAGEDShapeType}
            >
              {note}
            </Note>
          </FretCell>
        );
      })}
    </StringRow>
  );
};

export default FretRow;

import { getNotesStartingFrom, NOTES_FROM_C } from "../../data/music-theory";
import { FretCell, StringRow, Note as StyledNote } from "./parts";

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
        const $isInSet = notesSet.includes(note);
        const $activeMarkerNote = activeMarkerNote === note;

        // Wyliczenie ID dla klasy i stanu
        const get_CAGED_noteId = () => {
          let index = NOTES_FROM_C.indexOf(note) - CAGED_shift;
          if (index < 0) index += 11;
          return `${stringId}_${NOTES_FROM_C[index]}`;
        };

        const CAGED_noteId = get_CAGED_noteId();
        const $isSelected = shape.includes(CAGED_noteId);

        return (
          <FretCell
            $numOfCells={fretCells.length}
            key={`${stringId}-fret-${fIdx}`}
          >
            <StyledNote
              $isInSet={$isInSet}
              $activeMarkerNote={$activeMarkerNote}
              $isSelected={$isSelected}
              $isCAGEDShapeType={isCAGEDShapeType}
              className={`CAGED_noteId__${CAGED_noteId}`}
              onClick={() => handleNoteClick(CAGED_noteId)}
            >
              {note}
            </StyledNote>
          </FretCell>
        );
      })}
    </StringRow>
  );
};

export default FretRow;

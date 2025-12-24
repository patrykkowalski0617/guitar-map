import { getNotesStartingFrom, NOTES_FROM_C } from "../../data/music-theory";
import { extendArray } from "../../utils/extendArray";
import { FretCell, StringRow, Note as StyledNote } from "./parts";

const FretRow = ({
  string,
  sIdx,
  extendFretboardBy,
  notesSet,
  activeMarkerNote,
  CAGED_shift,
  handleNoteClick,
  shape,
  userShape,
}) => {
  const stringId = `${string}${6 - sIdx}`;
  const fretCells = extendArray(
    getNotesStartingFrom(string),
    extendFretboardBy
  );

  return (
    <StringRow>
      {fretCells.map((note, fIdx) => {
        const $isInSet = notesSet.includes(note);
        const $activeMarkerNote = activeMarkerNote === note;

        const get_CAGED_noteId = () => {
          let index = NOTES_FROM_C.indexOf(note) - CAGED_shift;
          if (index < 0) index += 12;
          return `${stringId}_${NOTES_FROM_C[index]}`;
        };

        const CAGED_noteId = get_CAGED_noteId();
        const $isInShape = shape.includes(CAGED_noteId);
        const $isInUserShape = userShape.includes(CAGED_noteId);

        return (
          <FretCell
            $numOfCells={fretCells.length}
            key={`${stringId}-fret-${fIdx}`}
          >
            <StyledNote
              $isInSet={$isInSet}
              $activeMarkerNote={$activeMarkerNote}
              $isInShape={$isInShape}
              $isInUserShape={$isInUserShape}
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

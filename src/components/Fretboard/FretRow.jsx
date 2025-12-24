import { NOTES_FROM_C } from "../../data/music-theory";
import { getNotesFromNote } from "../../utils/getNotesFromNote";
import { FretCell, StringRow, Note as StyledNote } from "./parts";

const FretRow = ({
  string,
  sIdx,
  numberOfFrets,
  CAGED_shift,
  handleNoteClick,
  shape,
  userShape,
}) => {
  const stringId = `${string}${6 - sIdx}`;
  const fretCells = getNotesFromNote(string, numberOfFrets);

  return (
    <StringRow>
      {fretCells.map((note, fIdx) => {
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

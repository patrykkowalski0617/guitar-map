import { NOTES_FROM_C } from "../../data/notes";
import { getNotesFromNote } from "../../utils/getNotesFromNote";
import { FretCell, StringRow, Note as StyledNote } from "./parts";

const FretRow = ({ string, sIdx, numberOfFrets, shape }) => {
  const stringId = `${string}${6 - sIdx}`;
  const fretCells = getNotesFromNote(string, numberOfFrets);

  return (
    <StringRow>
      {fretCells.map((note, fIdx) => {
        const get_CAGED_noteId = () => {
          let index = NOTES_FROM_C.indexOf(note);
          if (index < 0) index += 12;
          return `${stringId}_${NOTES_FROM_C[index]}`;
        };

        const CAGED_noteId = get_CAGED_noteId();
        const $isInShape = shape.includes(CAGED_noteId);

        return (
          <FretCell
            $numOfCells={fretCells.length}
            key={`${stringId}-fret-${fIdx}`}
          >
            <StyledNote
              $isInShape={$isInShape}
              className={`CAGED_noteId__${CAGED_noteId}`}
            ></StyledNote>
          </FretCell>
        );
      })}
    </StringRow>
  );
};

export default FretRow;

import { NOTES_FROM_C } from "../../data";
import { getNotesFromNote } from "../../utils";
import { FretCell, StringRow, Note as StyledNote } from "./parts";

const FretRow = ({
  string,
  sIdx,
  numberOfFrets,
  CAGED_shift,
  handleNoteClick,
  shape,
  CAGED_hoverShape,
  userShape,
  activeShapeRootNote,
  variantState,
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
        const isInShape = shape.includes(CAGED_noteId);
        const isInUserShape = userShape.includes(CAGED_noteId);
        const isInCAGED_hoverShape = CAGED_hoverShape.includes(CAGED_noteId);
        const isActiveShapeRootNote = activeShapeRootNote === note;
        const isLastClicked = variantState?.lastId === CAGED_noteId;

        return (
          <FretCell
            $numOfCells={fretCells.length}
            key={`${stringId}-fret-${fIdx}`}
          >
            <StyledNote
              $isInShape={isInShape}
              $isInUserShape={isInUserShape}
              $isInCAGED_hoverShape={isInCAGED_hoverShape}
              $isActiveShapeRootNote={isActiveShapeRootNote}
              $variantLabel={isLastClicked ? variantState.label : null}
              $isError={isLastClicked ? variantState.isError : false}
              onClick={() => handleNoteClick(note, CAGED_noteId)}
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

import { useDevStore } from "../../store/useDevStore";
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
  devModeShape,
  activeShapeRootNote,
  variantState,
  lockedShape,
  isCurrentShapeSaved,
}) => {
  const stringId = `${string}${6 - sIdx}`;
  const fretCells = getNotesFromNote(string, numberOfFrets);
  const { isDevMode } = useDevStore();

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
        const isInDevModeShape = devModeShape.includes(CAGED_noteId);
        const isInCAGED_hoverShape = CAGED_hoverShape.includes(CAGED_noteId);
        const isActiveShapeRootNote = activeShapeRootNote === note;
        const isLastClicked = variantState?.lastId === CAGED_noteId;
        const isLockedNote = lockedShape.includes(CAGED_noteId);

        return (
          <FretCell
            $numOfCells={fretCells.length}
            key={`${stringId}-fret-${fIdx}`}
          >
            <StyledNote
              $isInShape={isInShape}
              $isInDevModeShape={isInDevModeShape}
              $isInCAGED_hoverShape={isDevMode && isInCAGED_hoverShape}
              $isActiveShapeRootNote={isActiveShapeRootNote}
              $variantLabel={isLastClicked ? variantState.label : null}
              $isError={isLastClicked ? variantState.isError : false}
              $isShapeLocked={isLockedNote}
              $isSaved={isCurrentShapeSaved}
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

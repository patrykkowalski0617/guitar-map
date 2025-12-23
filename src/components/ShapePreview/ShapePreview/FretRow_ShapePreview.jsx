import { NOTES_FROM_C } from "../../../data/music-theory";
import { PreviewFretCell, PreviewStringRow, PreviewNote } from "./parts";

const FretRow_ShapePreview = ({
  stringId,
  rootNote,
  numberOfFrets,
  normalizedShape,
}) => {
  const startIndex = NOTES_FROM_C.indexOf(rootNote);
  const cells = Array.from({ length: numberOfFrets }, (_, i) => {
    let noteIdx = (startIndex + i) % 12;
    return NOTES_FROM_C[noteIdx];
  });

  return (
    <PreviewStringRow>
      {cells.map((note, fIdx) => {
        const currentPointId = `${stringId}_${note}`;
        const isInShape = normalizedShape.includes(currentPointId);

        return (
          <PreviewFretCell key={`${stringId}-fret-${fIdx}`}>
            <PreviewNote
              $isInShape={isInShape}
              className={`CAGED_noteId__${currentPointId}`}
            />
          </PreviewFretCell>
        );
      })}
    </PreviewStringRow>
  );
};

export default FretRow_ShapePreview;

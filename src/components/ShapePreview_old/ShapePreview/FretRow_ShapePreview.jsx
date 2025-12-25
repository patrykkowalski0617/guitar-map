import { PreviewFretCell, PreviewStringRow, PreviewNote } from "./parts";

const FretRow_ShapePreview = ({
  stringIndex,
  numberOfFrets,
  points, // punkty przypisane tylko do tej struny
}) => {
  const frets = Array.from({ length: numberOfFrets }, (_, i) => i);

  return (
    <PreviewStringRow>
      {frets.map((fIdx) => {
        // Sprawdzamy, czy któryś z punktów na tej strunie ma ten próg
        const isInShape = points.some((p) => p.normalizedFret === fIdx);

        return (
          <PreviewFretCell key={`s${stringIndex}-f${fIdx}`}>
            <PreviewNote
              $isInShape={isInShape}
              className={isInShape ? "active-note" : ""}
            />
          </PreviewFretCell>
        );
      })}
    </PreviewStringRow>
  );
};

export default FretRow_ShapePreview;

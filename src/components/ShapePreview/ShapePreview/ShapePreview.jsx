import FretRow_ShapePreview from "./FretRow_ShapePreview";
import { PreviewContainer } from "./parts";

const STRING_OFFSETS = [0, 5, 10, 15, 19, 24]; // Interwały między strunami

const ShapePreview = ({ shape, anchorStringIdx }) => {
  if (!shape || shape.length === 0) return null;

  // 1. Obliczamy fizyczne pozycje [string, fret] dla danego punktu zakotwiczenia
  const physicalPoints = shape
    .map(([sDiff, iDiff]) => {
      const targetStringIdx = anchorStringIdx + sDiff;
      if (targetStringIdx < 0 || targetStringIdx > 5) return null;

      // Logika z transposera: Absolutna wartość półtonowa
      const absoluteSemitones = STRING_OFFSETS[anchorStringIdx] + iDiff;
      // Próg = Absolutna wartość - offset konkretnej struny
      const fret = absoluteSemitones - STRING_OFFSETS[targetStringIdx];

      return { sIdx: targetStringIdx, fret };
    })
    .filter((p) => p !== null);

  // Jeśli nie wszystkie punkty kształtu zmieściły się na gryfie, nie renderujemy podglądu
  if (physicalPoints.length < shape.length) return null;

  // 2. Normalizacja widoku (żeby najniższy próg w podglądzie był progiem 0)
  const allFrets = physicalPoints.map((p) => p.fret);
  const minFret = Math.min(...allFrets);
  const maxFret = Math.max(...allFrets);

  const normalizedPoints = physicalPoints.map((p) => ({
    ...p,
    normalizedFret: p.fret - minFret,
  }));

  const numberOfVisibleFrets = Math.max(maxFret - minFret + 1, 1);

  return (
    <PreviewContainer>
      {/* Renderujemy struny od e1 (najcieńsza, idx 5) do E6 (najgrubsza, idx 0) */}
      {[5, 4, 3, 2, 1, 0].map((sIdx) => (
        <FretRow_ShapePreview
          key={sIdx}
          stringIndex={sIdx}
          numberOfFrets={numberOfVisibleFrets}
          points={normalizedPoints.filter((p) => p.sIdx === sIdx)}
        />
      ))}
    </PreviewContainer>
  );
};

export default ShapePreview;

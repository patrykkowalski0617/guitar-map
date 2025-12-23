import { NOTES_FROM_C } from "../../data/music-theory";
import FretRow_ShapePreview from "./FretRow_ShapePreview";
import { PreviewContainer } from "./parts";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const STRING_MAP = { E1: "E", A2: "A", D3: "D", G4: "G", B5: "B", E6: "E" };

const ShapePreview = ({ shape }) => {
  if (!shape || shape.length === 0) return null;

  const getPointFret = (point) => {
    const [sName, nName] = point.split("_");
    const startNote = STRING_MAP[sName];
    const startIndex = NOTES_FROM_C.indexOf(startNote);
    const targetIndex = NOTES_FROM_C.indexOf(nName);
    let fret = targetIndex - startIndex;
    if (fret < 0) fret += 12;
    return fret;
  };

  const allFrets = shape.map(getPointFret);
  const minFret = Math.min(...allFrets);
  const maxFret = Math.max(...allFrets);

  const normalizedShape = shape.map((point) => {
    const [sName] = point.split("_");
    const currentFret = getPointFret(point);
    const normalizedFret = currentFret - minFret;

    const startNote = STRING_MAP[sName];
    const startIndex = NOTES_FROM_C.indexOf(startNote);
    let newNoteIdx = (startIndex + normalizedFret) % 12;
    if (newNoteIdx < 0) newNoteIdx += 12;

    return `${sName}_${NOTES_FROM_C[newNoteIdx]}`;
  });

  const numberOfVisibleFrets = maxFret - minFret + 1;

  return (
    <PreviewContainer>
      {STRINGS_FIRST_NOTES.map((string, sIdx) => {
        const stringId = `${string}${6 - sIdx}`;

        return (
          <FretRow_ShapePreview
            key={stringId}
            stringId={stringId}
            rootNote={string}
            numberOfFrets={numberOfVisibleFrets}
            normalizedShape={normalizedShape}
          />
        );
      })}
    </PreviewContainer>
  );
};

export default ShapePreview;

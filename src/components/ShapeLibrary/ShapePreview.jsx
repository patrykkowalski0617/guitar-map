import { useStore } from "../../store/useStore";
import { ShapePreviewContainer, VariantLabel } from "./parts";
import FretRow from "./FretRow";
import { transposeShape } from "../../utils/transposer";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const numberOfFrets = 6;

const renderPoints = [
  ["E1_E", "A2_A", "D3_D", "G4_G", "B5_C", "E6_F"],
  ["E1_F#", "A2_B", "D3_E", "G4_A", "B5_D", "E6_G"],
  ["E1_G#", "A2_C#", "D3_F#", "G4_B", "B5_E", "E6_A"],
];

const ShapePreview = ({ variant, index, activeVariantIndex, stringIndex }) => {
  const { getActiveShapeRootNote } = useStore();
  const activeShapeRootNote = getActiveShapeRootNote();
  const selectedVariant = variant;
  const newShape = transposeShape(
    selectedVariant,
    renderPoints[index][stringIndex]
  );

  return (
    <ShapePreviewContainer $isActive={activeVariantIndex === index}>
      {STRINGS_FIRST_NOTES.map((string, sIdx) => (
        <FretRow
          key={string + sIdx}
          string={string}
          sIdx={sIdx}
          numberOfFrets={numberOfFrets}
          shape={newShape}
          activeShapeRootNote={activeShapeRootNote}
        />
      ))}
      <VariantLabel>Variant {index + 1}</VariantLabel>
    </ShapePreviewContainer>
  );
};

export default ShapePreview;

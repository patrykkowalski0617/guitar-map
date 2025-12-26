import { useStore } from "../../store/useStore";
import { ShapePreviewContainer, VariantLabel } from "./parts";
import FretRow from "./FretRow";
import { NOTES_FROM_C } from "../../data/notes";
import { transposeShape } from "../../utils/transposer";
import { useEffect, useState } from "react";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const numberOfFrets = 6;

const renderPoints = [
  ["E1_E", "A2_A", "D3_D", "G4_G", "B5_C", "E6_F"],
  ["E1_F#", "A2_B", "D3_E", "G4_A", "B5_D", "E6_G"],
  ["E1_G#", "A2_C#", "D3_F#", "G4_B", "B5_E", "E6_A"],
];

const ShapePreview = ({ variant, index, activeVariantIndex, stringIndex }) => {
  const { tuneKey, getActiveShapeRootNote } = useStore();

  const [renderPointsIndex, setRenderPointsIndex] = useState(stringIndex || 0);

  const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
  const activeShapeRootNote = getActiveShapeRootNote();

  const selectedVariant = variant;
  const newShape = transposeShape(
    selectedVariant,
    renderPoints[index][renderPointsIndex]
  );

  useEffect(() => {
    setRenderPointsIndex(stringIndex || 0);
  }, [stringIndex]);

  const clickHandler = () => {
    setRenderPointsIndex(
      (prevIndex) => (prevIndex + 1) % renderPoints[0].length
    );
  };
  return (
    <ShapePreviewContainer
      $isActive={activeVariantIndex === index}
      onClick={clickHandler}
    >
      {STRINGS_FIRST_NOTES.map((string, sIdx) => (
        <FretRow
          key={string + sIdx}
          string={string}
          sIdx={sIdx}
          numberOfFrets={numberOfFrets}
          CAGED_shift={CAGED_shift}
          shape={newShape}
          activeShapeRootNote={activeShapeRootNote}
        />
      ))}
      <VariantLabel>Variant {index + 1}</VariantLabel>
    </ShapePreviewContainer>
  );
};

export default ShapePreview;

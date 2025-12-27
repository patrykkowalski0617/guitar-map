import { useStore } from "../../store/useStore";
import ShapeTypeDisplay from "../ShapeTypeDisplay/ShapeTypeDisplay";
import { ShapeContainer } from "./parts";
import ShapePreview from "./ShapePreview";

const ShapesLibrary = () => {
  const { getActiveChordVariants, variantState } = useStore();

  const activeChordVariants = getActiveChordVariants();

  const activeVariantIndex = variantState.index;
  const stringIndex = variantState.lastId?.match(/\d+/)[0] - 1;

  return (
    <>
      <ShapeTypeDisplay />
      <ShapeContainer>
        {activeChordVariants.map((variant, index) => (
          <ShapePreview
            variant={variant}
            key={index}
            index={index}
            activeVariantIndex={activeVariantIndex}
            stringIndex={stringIndex}
          />
        ))}
      </ShapeContainer>
    </>
  );
};

export default ShapesLibrary;

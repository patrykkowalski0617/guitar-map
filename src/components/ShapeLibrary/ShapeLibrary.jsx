import { ShapeContainer } from "./parts";
import ShapePreview from "./ShapePreview";

const ShapesLibrary = () => {
  return (
    <>
      {/* GEMINI tu ma być nazwa shapu */}
      <ShapeContainer>
        <ShapePreview variant={0} />
        <ShapePreview variant={1} />
        <ShapePreview variant={2} />
      </ShapeContainer>
    </>
  );
};

export default ShapesLibrary;

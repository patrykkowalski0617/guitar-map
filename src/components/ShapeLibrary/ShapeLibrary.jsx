import { ShapeContainer } from "./parts";
import ShapePreview from "./ShapePreview";

const ShapesLibrary = () => {
  return (
    <>
      tutaj wszystkie shapy i niech się zakreślają jak kolory
      <ShapeContainer>
        <ShapePreview variant={0} />
        <ShapePreview variant={1} />
        <ShapePreview variant={2} />
      </ShapeContainer>
    </>
  );
};

export default ShapesLibrary;

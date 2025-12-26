import { ShapeContainer } from "./parts";
import ShapePreview from "./ShapePreview";

const ShapesLibrary = () => {
  return (
    <>
      tutaj wszystkie shapy i
      <br />
      1. wszystkie disp none i niech pokazuje się tylko aktywny
      <br />
      2. akurat kliknięty wariant niech się podświetla
      <br />
      3. niech będzie opcja pokazania wszystkich shapów
      <ShapeContainer>
        <ShapePreview variant={0} />
        <ShapePreview variant={1} />
        <ShapePreview variant={2} />
      </ShapeContainer>
    </>
  );
};

export default ShapesLibrary;

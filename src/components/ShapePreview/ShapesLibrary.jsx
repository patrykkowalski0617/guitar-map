import { chordShapes } from "../../data/shapes";
import {
  LibraryWrapper,
  CategorySection,
  CategoryTitle,
  ShapesGrid,
  ShapeItem,
  ShapeLabel,
} from "./parts";
import ShapePreview from "./ShapePreview/ShapePreview";

const ShapesLibrary = () => {
  if (!chordShapes || !Array.isArray(chordShapes)) return null;

  return (
    <LibraryWrapper>
      {chordShapes.map((group) => {
        if (group.shapes.length === 0) return null;

        return (
          <CategorySection key={group.id}>
            <CategoryTitle>{group.label}</CategoryTitle>

            <ShapesGrid>
              {group.shapes.map((shape, index) => (
                <ShapeItem key={`${group.id}-${index}`}>
                  <ShapePreview shape={shape} />
                  <ShapeLabel>Wariant {index + 1}</ShapeLabel>
                </ShapeItem>
              ))}
            </ShapesGrid>
          </CategorySection>
        );
      })}
    </LibraryWrapper>
  );
};

export default ShapesLibrary;

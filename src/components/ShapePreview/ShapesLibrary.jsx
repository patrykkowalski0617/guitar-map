import { NEW_chordShapes } from "../../data/data";
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
  if (!NEW_chordShapes || !Array.isArray(NEW_chordShapes)) return null;

  // Definiujemy nazwy strun dla etykiet sub-wersji
  const STRING_NAMES = ["E1", "A2", "D3", "G4", "B5", "E6"];

  return (
    <LibraryWrapper>
      {NEW_chordShapes.map((group) => {
        if (group.shapes.length === 0) return null;

        return (
          <CategorySection key={group.id}>
            <CategoryTitle>{group.label}</CategoryTitle>

            <ShapesGrid>
              {group.shapes.map((shape, variantIndex) => {
                // Dla każdego wariantu generujemy sub-wersje (start od struny 0 do 5)
                return [0, 1, 2, 3, 4, 5].map((anchorStringIdx) => (
                  <ShapeItem
                    key={`${group.id}-${variantIndex}-${anchorStringIdx}`}
                  >
                    <ShapePreview
                      shape={shape}
                      anchorStringIdx={anchorStringIdx}
                    />
                    <ShapeLabel>
                      V{variantIndex + 1} / Start:{" "}
                      {STRING_NAMES[anchorStringIdx]}
                    </ShapeLabel>
                  </ShapeItem>
                ));
              })}
            </ShapesGrid>
          </CategorySection>
        );
      })}
    </LibraryWrapper>
  );
};

export default ShapesLibrary;

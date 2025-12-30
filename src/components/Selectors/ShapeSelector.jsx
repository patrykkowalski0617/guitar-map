import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import Selector from "./Selector";

const ShapeSelector = () => {
  const {
    activeMusicContext,
    activeShape,
    setActiveShape,
    setActiveShapeById, // Nowa metoda
    getActiveShapeId, // Nowy getter
    formatShapeName, // Gotowy pomocnik ze store
  } = useStore();

  // Budujemy tablicę obiektów { label, value }, gdzie value to unikalne ID
  const shapeOptions =
    activeMusicContext?.shapes?.map((shape) => ({
      label: formatShapeName(shape),
      value: shape.id,
    })) || [];

  useEffect(() => {
    if (activeMusicContext?.shapes?.length > 0) {
      // Sprawdzamy ważność po ID, aby uniknąć pętli referencyjnych obiektów
      const isStillValid = activeMusicContext.shapes.some(
        (s) => s.id === activeShape?.id
      );

      if (!isStillValid) {
        setActiveShape(activeMusicContext.shapes[0]);
      }
    }
    // Reagujemy na zmianę kontekstu lub utratę ważności kształtu
  }, [
    activeMusicContext?.FunctionContextName,
    activeShape?.id,
    setActiveShape,
    activeMusicContext.shapes,
  ]);

  if (shapeOptions.length === 0) return null;

  return (
    <Selector
      label="Set of notes"
      options={shapeOptions}
      // Przekazujemy unikalne ID jako aktualną wartość
      value={getActiveShapeId()}
      // Przekazujemy ID do funkcji zmieniającej stan
      onChange={setActiveShapeById}
    />
  );
};

export default ShapeSelector;

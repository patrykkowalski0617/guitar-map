import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import Selector from "./Selector";

const ShapeSelector = () => {
  const {
    activeMusicContext,
    activeShape,
    setActiveShape,
    setActiveShapeById,
    getActiveShapeId,
    formatShapeName,
  } = useStore();

  const shapeOptions =
    activeMusicContext?.shapes?.map((shape) => ({
      label: formatShapeName(shape),
      value: shape.id,
    })) || [];

  useEffect(() => {
    if (activeMusicContext?.shapes?.length > 0) {
      const isStillValid = activeMusicContext.shapes.some(
        (s) => s.id === activeShape?.id
      );

      if (!isStillValid) {
        setActiveShape(activeMusicContext.shapes[0]);
      }
    }
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
      value={getActiveShapeId()}
      onChange={setActiveShapeById}
    />
  );
};

export default ShapeSelector;

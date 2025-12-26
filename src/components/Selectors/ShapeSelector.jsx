import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import Selector from "./Selector";

const ShapeSelector = () => {
  const {
    activeMusicContext,
    activeShape,
    setActiveShape,
    setActiveShapeByName,
    getKeyNotes,
  } = useStore();

  const keyNotes = getKeyNotes();

  // Helper do nazw
  const renderShapeName = (shape) => {
    if (!shape) return "";
    const rootNote =
      shape.rootSemitone !== undefined
        ? keyNotes[shape.rootSemitone]
        : undefined;
    return shape.getNotesSetName(rootNote);
  };

  const shapeOptions =
    activeMusicContext?.shapes?.map((shape) => renderShapeName(shape)) || [];

  // Logika synchronizacji: Pilnuje, by Shape pasował do Contextu
  useEffect(() => {
    if (activeMusicContext?.shapes?.length > 0) {
      const isStillValid = activeMusicContext.shapes.some(
        (s) => s === activeShape
      );
      if (!isStillValid) {
        setActiveShape(activeMusicContext.shapes[0]);
      }
    }
  }, [activeMusicContext, activeShape, setActiveShape]);

  if (shapeOptions.length === 0) return null;

  return (
    <Selector
      label="Set of notes in context"
      options={shapeOptions}
      value={renderShapeName(activeShape)}
      onChange={setActiveShapeByName}
    />
  );
};

export default ShapeSelector;

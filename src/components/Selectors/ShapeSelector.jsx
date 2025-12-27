import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import Selector from "./Selector";
import { enharmonicTransform } from "../../data/notes";

const ShapeSelector = () => {
  const {
    activeMusicContext,
    activeShape,
    setActiveShape,
    setActiveShapeByName,
    getKeyNotes,
  } = useStore();

  const keyNotes = getKeyNotes();

  const renderShapeName = (shape) => {
    if (!shape) return "";
    const rootNote =
      shape.rootSemitone !== undefined
        ? keyNotes[shape.rootSemitone]
        : undefined;
    return enharmonicTransform(shape.getNotesSetName(rootNote));
  };

  const shapeOptions =
    activeMusicContext?.shapes?.map((shape) => renderShapeName(shape)) || [];

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
      label="Set of notes"
      options={shapeOptions}
      value={renderShapeName(activeShape)}
      onChange={setActiveShapeByName}
    />
  );
};

export default ShapeSelector;

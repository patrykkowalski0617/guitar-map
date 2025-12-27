import { useStore } from "../../store/useStore";
import { setsShapes } from "../../data/setsShapes";
import HorizontalScrollDisplay from "./HorizontalScrollDisplay";

const ShapeTypeHorizontalScrollDisplay = () => {
  const activeChordId = useStore((state) => state.getActiveChordId());
  const setActiveChordId = useStore((state) => state.setActiveChordId);

  const validSets = setsShapes
    .filter((set) => set.id && set.label)
    .map((set) => ({ id: set.id, label: set.label }));

  return (
    <HorizontalScrollDisplay
      items={validSets}
      activeId={activeChordId}
      onItemClick={setActiveChordId}
    />
  );
};

export default ShapeTypeHorizontalScrollDisplay;

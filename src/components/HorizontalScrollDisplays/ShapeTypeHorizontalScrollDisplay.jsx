import { useStore } from "../../store/useStore";
import { setsShapes } from "../../data/setsShapes";
import HorizontalScrollDisplay from "./HorizontalScrollDisplay";
import { SubsectionTitle } from "../../parts";

const ShapeTypeHorizontalScrollDisplay = () => {
  const activeChordId = useStore((state) => state.getActiveChordId());

  const validSets = setsShapes
    .filter((set) => set.id && set.label)
    .map((set) => ({ id: set.id, label: set.label }));

  return (
    <>
      <SubsectionTitle>Shape Type</SubsectionTitle>
      <HorizontalScrollDisplay items={validSets} activeId={activeChordId} />
    </>
  );
};

export default ShapeTypeHorizontalScrollDisplay;

import { useEffect, useRef } from "react";
import { useStore } from "../../store/useStore";
import { setsShapes } from "../../data/setsShapes";
import { Label, SelectorContainer } from "./parts";

const ShapeTypeDisplay = () => {
  const activeChordId = useStore((state) => state.getActiveChordId());
  const setActiveChordId = useStore((state) => state.setActiveChordId);
  const containerRef = useRef(null);
  const validSets = setsShapes.filter((set) => set.id && set.label);

  useEffect(() => {
    const activeElement = containerRef.current?.querySelector(
      '[data-active="true"]'
    );

    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeChordId]);

  return (
    <SelectorContainer ref={containerRef}>
      {validSets.map((item) => (
        <Label
          key={item.id}
          $isActive={activeChordId === item.id}
          data-active={activeChordId === item.id}
          onClick={() => setActiveChordId(item.id)}
        >
          {item.label}
        </Label>
      ))}
    </SelectorContainer>
  );
};

export default ShapeTypeDisplay;

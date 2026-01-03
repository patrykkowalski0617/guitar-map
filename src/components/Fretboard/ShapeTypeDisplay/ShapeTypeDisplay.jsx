import { useEffect, useMemo } from "react";
import { useStore } from "../../../store/useStore";
import { setsShapes } from "../../../data";
import userProgress from "../../../data/userProgress";
import ScrollFader from "../../ScrollFader/ScrollFader";
import { Label } from "./parts";

const ShapeTypeDisplay = ({ opacityOff }) => {
  const activeChordId = useStore((state) => state.getActiveChordId());
  const isProgressMode = useStore((state) => state.isProgressMode);
  const toggleProgressMode = useStore((state) => state.toggleProgressMode);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === "p") {
        toggleProgressMode();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleProgressMode]);

  const items = useMemo(() => {
    return setsShapes
      .filter((set) => set.id && set.label)
      .map((set) => {
        const totalVariants = set.shapes?.length || 0;
        const completedVariants = (userProgress[set.id] || []).filter((id) =>
          set.shapes.some((shape) => shape.id === id)
        ).length;

        return {
          id: set.id,
          label: set.label,
          color: set.color,
          progressRatio:
            totalVariants > 0 ? completedVariants / totalVariants : 0,
        };
      });
  }, []);

  return (
    <ScrollFader activeValue={activeChordId}>
      <Label $isLegendLabel $opacityOff>
        {!isProgressMode && "All available shapes:"}
      </Label>

      {items.map((item) => {
        const isActive = activeChordId === item.id;

        return (
          <Label
            key={item.id}
            data-active={isActive ? "true" : "false"}
            $isActive={isActive}
            $color={item.color}
            $progressRatio={isProgressMode ? item.progressRatio : 0}
            $opacityOff={opacityOff}
          >
            {item.label}
            {isProgressMode && ` (${Math.round(item.progressRatio * 100)}%)`}
          </Label>
        );
      })}
    </ScrollFader>
  );
};

export default ShapeTypeDisplay;

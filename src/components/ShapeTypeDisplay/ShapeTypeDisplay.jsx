import { useStore } from "../../store/useStore";
import { setsShapes, userProgress } from "../../data";
import { showUserProgress } from "../../settings";
import ScrollFader from "../ScrollFader/ScrollFader";
import { Label } from "./parts";

const ShapeTypeDisplay = ({ opacityOff }) => {
  const activeChordId = useStore((state) => state.getActiveChordId());

  const items = setsShapes
    .filter((set) => set.id && set.label)
    .map((set) => {
      const learnedShapeIds = userProgress[set.id] || [];
      const totalShapes = set.shapes?.length || 0;

      const learnedCount = set.shapes.filter((s) =>
        learnedShapeIds.includes(s.id)
      ).length;

      const progressValue = totalShapes > 0 ? learnedCount / totalShapes : 0;

      return {
        id: set.id,
        label: set.label,
        $progress: progressValue,
        color: set.color,
      };
    });

  return (
    <ScrollFader activeValue={activeChordId}>
      {items.map((item) => (
        <Label
          key={item.id}
          $isActive={activeChordId === item.id}
          $color={item.color}
          $opacityOff={opacityOff}
          data-active={activeChordId === item.id}
          $progress={item.$progress}
          $showUserProgress={showUserProgress}
        >
          {item.label}
        </Label>
      ))}
    </ScrollFader>
  );
};

export default ShapeTypeDisplay;

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
      const learnedShapes = userProgress[set.id] || [];
      const totalShapes = set.shapes?.length || 0;

      const progressValue =
        totalShapes > 0 ? learnedShapes.length / totalShapes : 0;

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
          $progress={showUserProgress ? item.$progress : 0}
        >
          {item.label}
        </Label>
      ))}
    </ScrollFader>
  );
};

export default ShapeTypeDisplay;

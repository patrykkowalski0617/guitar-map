import { useStore } from "../../store/useStore";
import { setsShapes } from "../../data";
import ScrollFader from "../ScrollFader/ScrollFader";
import { Label } from "./parts";

const ShapeTypeDisplay = ({ opacityOff }) => {
  const activeChordId = useStore((state) => state.getActiveChordId());

  const items = setsShapes
    .filter((set) => set.id && set.label)
    .map((set) => {
      return {
        id: set.id,
        label: set.label,
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
        >
          {item.label}
        </Label>
      ))}
    </ScrollFader>
  );
};

export default ShapeTypeDisplay;

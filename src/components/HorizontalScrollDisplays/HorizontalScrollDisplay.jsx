import ScrollFader from "../ScrollFader/ScrollFader";
import { Label } from "./parts";

const HorizontalScrollDisplay = ({ items, activeId, opacityOff }) => {
  return (
    <ScrollFader activeValue={activeId}>
      {items.map((item) => (
        <Label
          key={item.id}
          $isActive={activeId === item.id}
          data-active={activeId === item.id}
          $color={item.color}
          $opacityOff={opacityOff}
        >
          {item.label}
        </Label>
      ))}
    </ScrollFader>
  );
};

export default HorizontalScrollDisplay;

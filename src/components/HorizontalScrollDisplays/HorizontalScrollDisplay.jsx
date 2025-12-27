import { useEffect, useRef } from "react";
import { Label, SelectorContainer } from "./parts";

const HorizontalScrollDisplay = ({ items, activeId, onItemClick }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Szukamy elementu z data-active="true" wewnątrz tego konkretnego kontenera
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
  }, [activeId]); // Reaguje na zmianę aktywnego ID

  return (
    <SelectorContainer ref={containerRef}>
      {items.map((item) => (
        <Label
          key={item.id}
          $isActive={activeId === item.id}
          data-active={activeId === item.id}
          onClick={() => onItemClick && onItemClick(item.id)}
        >
          {item.label}
        </Label>
      ))}
    </SelectorContainer>
  );
};

export default HorizontalScrollDisplay;

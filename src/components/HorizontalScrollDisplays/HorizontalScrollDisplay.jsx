import { useEffect, useRef } from "react";
import { Label, DisplayContainer } from "./parts";

const HorizontalScrollDisplay = ({ items, activeId }) => {
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
    <DisplayContainer ref={containerRef}>
      {items.map((item) => (
        <Label
          key={item.id}
          $isActive={activeId === item.id}
          data-active={activeId === item.id}
          $color={item.color} // Przekazujemy kolor do styled-components
        >
          {item.label}
        </Label>
      ))}
    </DisplayContainer>
  );
};

export default HorizontalScrollDisplay;

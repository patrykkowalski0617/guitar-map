import { useTheme } from "styled-components";
import HorizontalScrollDisplay from "./HorizontalScrollDisplay";

const ColorProfileHorizontalScrollDisplay = () => {
  const theme = useTheme();

  // Definiujemy itemy legendy z przypisanymi kolorami
  const legendItems = [
    { id: "transparent", label: "Transparent", color: theme.colors.text },
    { id: "guide", label: "Color (Guide Tones)", color: theme.colors.yellow },
    { id: "tension", label: "Tension", color: theme.colors.blue },
    { id: "more-tension", label: "More Tension", color: theme.colors.violet },
    { id: "avoid", label: "Avoid Notes", color: theme.colors.red },
  ];

  return <HorizontalScrollDisplay items={legendItems} />;
};

export default ColorProfileHorizontalScrollDisplay;

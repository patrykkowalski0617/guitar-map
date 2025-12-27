import { useTheme } from "styled-components";
import HorizontalScrollDisplay from "./HorizontalScrollDisplay";
import { SubsectionTitle } from "../../parts";

const ColorProfileHorizontalScrollDisplay = () => {
  const theme = useTheme();

  const legendItems = [
    { id: "transparent", label: "Transparent", color: theme.colors.text },
    { id: "guide", label: "Color (Guide Tones)", color: theme.colors.yellow },
    { id: "tension", label: "Tension", color: theme.colors.blue },
    { id: "more-tension", label: "More Tension", color: theme.colors.violet },
    { id: "avoid", label: "Avoid Notes", color: theme.colors.red },
  ];
  return (
    <>
      <SubsectionTitle>Note Set Visualizer Legend</SubsectionTitle>
      <HorizontalScrollDisplay items={legendItems} />
    </>
  );
};

export default ColorProfileHorizontalScrollDisplay;

import { useTheme } from "styled-components";
import { useStore } from "../../store/useStore";
import ProfileRow from "./ProfileRow";
import * as S from "./parts";
import ColorProfileHorizontalScrollDisplay from "../HorizontalScrollDisplays/ColorProfileHorizontalScrollDisplay";

const ColorProfileVisualizer = () => {
  const theme = useTheme();
  const activeShape = useStore((state) => state.activeShape);
  const activeMusicContext = useStore((state) => state.activeMusicContext);
  const getNoteNameByOffset = useStore((state) => state.getNoteNameByOffset);

  if (!activeShape?.colorProfile || !activeMusicContext) return null;

  const majorRootName = getNoteNameByOffset(activeMusicContext.majorRoot);
  const minorRootName = getNoteNameByOffset(activeMusicContext.minorRoot);

  const legendItems = [
    { id: "transparent", label: "Transparent", color: theme.colors.text },
    { id: "guide", label: "Color (Guide Tones)", color: theme.colors.yellow },
    { id: "tension", label: "Tension", color: theme.colors.blue },
    { id: "more-tension", label: "More Tension", color: theme.colors.violet },
    { id: "avoid", label: "Avoid Notes", color: theme.colors.red },
  ];

  return (
    <S.VisualizerContainer>
      <ProfileRow
        label="Major"
        profile={activeShape.colorProfile.major}
        rootNoteName={majorRootName}
      />
      {activeShape.colorProfile.minor && (
        <ProfileRow
          label="Minor"
          profile={activeShape.colorProfile.minor}
          rootNoteName={minorRootName}
        />
      )}
      <ColorProfileHorizontalScrollDisplay items={legendItems} />
    </S.VisualizerContainer>
  );
};

export default ColorProfileVisualizer;

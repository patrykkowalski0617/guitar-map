import { useStore } from "../../store/useStore";
import ProfileRow from "./ProfileRow";
import * as S from "./parts";

const ColorProfileVisualizer = () => {
  const activeShape = useStore((state) => state.activeShape);
  const activeMusicContext = useStore((state) => state.activeMusicContext);
  const getNoteNameByOffset = useStore((state) => state.getNoteNameByOffset);

  if (!activeShape?.colorProfile || !activeMusicContext) return null;

  const majorRootName = getNoteNameByOffset(activeMusicContext.majorRoot);
  const minorRootName = getNoteNameByOffset(activeMusicContext.minorRoot);

  return (
    <S.Wrapper>
      <S.VisualizerContainer>
        {/* Rząd dla Major */}
        <ProfileRow
          label="Major"
          profile={activeShape.colorProfile.major}
          rootNoteName={majorRootName}
        />

        {/* Rząd dla Minor */}
        <ProfileRow
          label="Minor"
          profile={activeShape.colorProfile.minor}
          rootNoteName={minorRootName}
        />

        {/* Legenda z kolorami z theme */}
        <S.LegendColumn>
          <S.LegendLabel $color={({ theme }) => theme.colors.text}>
            Transparent
          </S.LegendLabel>
          <S.LegendLabel $color={({ theme }) => theme.colors.yellow}>
            Color (Guide Tones)
          </S.LegendLabel>
          <S.LegendLabel $color={({ theme }) => theme.colors.blue}>
            Tension
          </S.LegendLabel>
          <S.LegendLabel $color={({ theme }) => theme.colors.violet}>
            More Tension
          </S.LegendLabel>
          <S.LegendLabel $color={({ theme }) => theme.colors.red}>
            Avoid Notes
          </S.LegendLabel>
        </S.LegendColumn>
      </S.VisualizerContainer>
    </S.Wrapper>
  );
};

export default ColorProfileVisualizer;

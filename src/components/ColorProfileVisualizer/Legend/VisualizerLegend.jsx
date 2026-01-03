import * as S from "./parts";
import ToneDot from "../ToneDot";
import ScrollFader from "../../ScrollFader/ScrollFader";

const VisualizerLegend = () => {
  const legendGroups = [
    { interval: 1, profile: { usedTones: [[1, ""]] }, label: "Transparent" },
    {
      interval: 3,
      profile: { usedTones: [[3, ""]] },
      label: "Color (Guide Tones)",
    },
    { interval: 9, profile: { usedTones: [[9, ""]] }, label: "Tension" },
    {
      interval: 9,
      profile: { alteredTones: [[9, ""]] },
      label: "Tension & Altered",
    },
    { interval: 11, profile: { usedTones: [[11, ""]] }, label: "More Tension" },
    {
      interval: 11,
      profile: { alteredTones: [[11, ""]] },
      label: "More Tension & Altered",
    },
    {
      interval: 1,
      // Zakładam, że avoidNotes to też teraz tablica tablic lub sprawdzasz je po [0]
      profile: { avoidNotes: [[1, ""]], usedTones: [[1, ""]] },
      label: '"Avoid Note"',
    },
  ];

  return (
    <ScrollFader>
      <S.PreviewMainContainer>
        <S.LegendItem>
          <S.LegendLabel $isLegendLabel $opacityOff>
            Legend:
          </S.LegendLabel>
        </S.LegendItem>
        {legendGroups.map(({ interval, profile, label }) => {
          const isAltered =
            profile.alteredTones && profile.alteredTones.length > 0;

          return (
            <S.LegendItem $isAltered={isAltered} key={label}>
              <ToneDot legendRender interval={interval} profile={profile} />
              <S.LegendLabel>{label}</S.LegendLabel>
            </S.LegendItem>
          );
        })}
      </S.PreviewMainContainer>
    </ScrollFader>
  );
};

export default VisualizerLegend;

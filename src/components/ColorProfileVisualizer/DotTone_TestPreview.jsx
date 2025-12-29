import * as S from "./DotTone_TestPreview_parts";
import ToneDot from "./ToneDot";

const VisualizerPreview = () => {
  const legendGroups = [
    {
      groupLabel: "Transparent",
      items: [{ interval: 1, profile: { usedTones: [1] }, label: "Root/5th" }],
    },
    {
      groupLabel: "Color (Guide Tones)",
      items: [{ interval: 3, profile: { usedTones: [3] }, label: "3rd/7th" }],
    },
    {
      groupLabel: "Tension",
      items: [
        { interval: 9, profile: { usedTones: [9] }, label: "9th" },
        { interval: 9, profile: { alteredTones: [9] }, label: "9th Altered" },
      ],
    },
    {
      groupLabel: "More Tension",
      items: [
        { interval: 11, profile: { usedTones: [11] }, label: "11th/13th" },
        {
          interval: 11,
          profile: { alteredTones: [11] },
          label: "11th/13th Alt",
        },
      ],
    },
    {
      groupLabel: "Avoid Notes",
      items: [
        {
          interval: 1,
          profile: { avoidNotes: [1], usedTones: [1] },
          label: '"Avoid Note"',
        },
      ],
    },
  ];

  return (
    <S.PreviewMainContainer>
      {legendGroups.map((group, gIndex) => (
        <S.PreviewGroupWrapper key={gIndex}>
          <S.GroupTitle>{group.groupLabel}</S.GroupTitle>
          <S.PreviewItemsGrid>
            {group.items.map((item, iIndex) => {
              const isAltered = item.profile?.alteredTones?.includes(
                item.interval
              );

              return (
                <S.LegendItem key={iIndex} $isAltered={isAltered}>
                  <S.LegendDotWrapper>
                    <ToneDot
                      legendRender
                      interval={item.interval}
                      profile={item.profile}
                    />
                  </S.LegendDotWrapper>
                  <S.LegendLabel>{item.label}</S.LegendLabel>
                </S.LegendItem>
              );
            })}
          </S.PreviewItemsGrid>
        </S.PreviewGroupWrapper>
      ))}
    </S.PreviewMainContainer>
  );
};

export default VisualizerPreview;

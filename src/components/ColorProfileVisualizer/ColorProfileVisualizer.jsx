import styled from "styled-components";
import { useStore } from "../../store/useStore";

// --- STYLES ---

const getIntervalColor = (interval, colors, $isAvoid) => {
  if ($isAvoid) return colors.red;
  if (interval === 1 || interval === 5) return colors.text;
  if (interval === 3 || interval === 7) return colors.yellow;
  if (interval === 9) return colors.blue;
  return colors.violet;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
`;

const VisualizerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: 12px;
  width: fit-content;
  align-items: flex-start;
`;

const ProfileColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const DotsWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  height: 65px;
`;

// --- LEGEND STYLES ---

const LegendColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 65px;
  gap: 4px;
  padding-left: 25px;
  border-left: 1px solid ${({ theme }) => theme.colors.text}11;
`;

const LegendLabel = styled.div`
  height: 10px;
  display: flex;
  align-items: center;
  font-size: 0.55rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  opacity: 0.7;
  white-space: nowrap;
`;

// --- DOT STYLES ---

const DotStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const IntervalNumber = styled.span`
  font-size: 0.65rem;
  font-weight: bold;
  color: ${({ $interval, theme, $isActive, $isAvoid }) =>
    $isActive
      ? getIntervalColor($interval, theme.colors, $isAvoid)
      : theme.colors.text};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};
  transition: all 0.5s ease;
`;

const MainLabel = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.text}22;
  padding-top: 10px;
  width: 100%;

  strong {
    color: ${({ theme }) => theme.colors.yellow};
    margin-right: 5px;
  }
`;

const ToneDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: ${({ $interval, theme, $isAvoid }) =>
    getIntervalColor($interval, theme.colors, $isAvoid)};

  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateY(${({ $offset }) => $offset}px);
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};

  box-shadow: ${({ $isExposed, $interval, theme, $isAvoid }) => {
    if (!$isExposed) return "none";
    const color = getIntervalColor($interval, theme.colors, $isAvoid);
    return `0 0 12px ${color}`;
  }};
`;

// --- LOGIC ---

const INTERVALS = [1, 3, 5, 7, 9, 11, 13];

const ProfileRow = ({ label, profile, rootNoteName }) => {
  return (
    <ProfileColumn>
      <DotsWrapper>
        {INTERVALS.map((interval) => {
          const isExposed = profile?.exposedTone === interval;
          const isUsed = profile?.usedTones?.includes(interval);
          const isAvoid = profile?.avoidNotes?.includes(interval);
          const isActive = isExposed || isUsed || isAvoid;

          let offset = 0;
          if (isExposed) offset = -35;
          else if (isUsed || isAvoid) offset = -18;

          return (
            <DotStack key={interval}>
              <ToneDot
                $interval={interval}
                $offset={offset}
                $isExposed={isExposed}
                $isActive={isActive}
                $isAvoid={isAvoid}
                title={isAvoid ? `Avoid: ${interval}` : `Interval: ${interval}`}
              />
              <IntervalNumber
                $interval={interval}
                $isActive={isActive}
                $isAvoid={isAvoid}
              >
                {interval}
              </IntervalNumber>
            </DotStack>
          );
        })}
      </DotsWrapper>
      <MainLabel>
        <strong>{rootNoteName}</strong> {label}
      </MainLabel>
    </ProfileColumn>
  );
};

const ColorProfileVisualizer = () => {
  const activeShape = useStore((state) => state.activeShape);
  const activeMusicContext = useStore((state) => state.activeMusicContext);
  const getNoteNameByOffset = useStore((state) => state.getNoteNameByOffset);

  if (!activeShape?.colorProfile || !activeMusicContext) return null;

  const majorRootName = getNoteNameByOffset(activeMusicContext.majorRoot);
  const minorRootName = getNoteNameByOffset(activeMusicContext.minorRoot);

  return (
    <Wrapper>
      <VisualizerContainer>
        <ProfileRow
          label="Major"
          profile={activeShape.colorProfile.major}
          rootNoteName={majorRootName}
        />
        <ProfileRow
          label="Minor"
          profile={activeShape.colorProfile.minor}
          rootNoteName={minorRootName}
        />

        <LegendColumn>
          <LegendLabel $color={({ theme }) => theme.colors.text}>
            Transparent
          </LegendLabel>
          <LegendLabel $color={({ theme }) => theme.colors.yellow}>
            Color (Guide Tones)
          </LegendLabel>
          <LegendLabel $color={({ theme }) => theme.colors.blue}>
            Tension
          </LegendLabel>
          <LegendLabel $color={({ theme }) => theme.colors.violet}>
            More Tension
          </LegendLabel>
          <LegendLabel $color={({ theme }) => theme.colors.red}>
            Avoid Notes
          </LegendLabel>
        </LegendColumn>
      </VisualizerContainer>
    </Wrapper>
  );
};

export default ColorProfileVisualizer;

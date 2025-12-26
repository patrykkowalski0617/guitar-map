import styled from "styled-components";
import { useStore } from "../../store/useStore";

// --- STYLES (bez zmian) ---

const getIntervalColor = (interval, colors) => {
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
  gap: 60px;
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: 12px;
  width: fit-content;
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

const DotStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const IntervalNumber = styled.span`
  font-size: 0.65rem;
  font-weight: bold;
  color: ${({ $interval, theme, $isActive }) =>
    $isActive ? getIntervalColor($interval, theme.colors) : theme.colors.text};
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
    margin-left: 5px;
  }
`;

const ToneDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: ${({ $interval, theme }) =>
    getIntervalColor($interval, theme.colors)};

  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateY(${({ $offset }) => $offset}px);
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};

  box-shadow: ${({ $isExposed, $interval, theme }) => {
    if (!$isExposed) return "none";
    const color = getIntervalColor($interval, theme.colors);
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
          const isExposed = profile?.exposedTone_abs === interval;
          const isUsed = profile?.usedTones_abs?.includes(interval);
          const isActive = isExposed || isUsed;

          let offset = 0;
          if (isExposed) offset = -35;
          else if (isUsed) offset = -18;

          return (
            <DotStack key={interval}>
              <ToneDot
                $interval={interval}
                $offset={offset}
                $isExposed={isExposed}
                $isActive={isActive}
              />
              <IntervalNumber $interval={interval} $isActive={isActive}>
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
  // Wyciągamy helper zamiast całej tablicy nut
  const getNoteNameByOffset = useStore((state) => state.getNoteNameByOffset);

  if (!activeShape?.colorProfile) return null;

  // Używamy helpera - kod jest teraz bardziej deklaratywny
  const majorRootName = getNoteNameByOffset(
    activeShape.colorProfile.major.root_rel
  );
  const minorRootName = getNoteNameByOffset(
    activeShape.colorProfile.minor.root_rel
  );

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
      </VisualizerContainer>
    </Wrapper>
  );
};

export default ColorProfileVisualizer;

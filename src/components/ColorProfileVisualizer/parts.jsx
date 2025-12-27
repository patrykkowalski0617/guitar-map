import styled from "styled-components";

const getIntervalColor = (interval, colors, $isAvoid) => {
  if ($isAvoid) return colors.red;
  if (interval === 1 || interval === 5) return colors.text;
  if (interval === 3 || interval === 7) return colors.yellow;
  if (interval === 9) return colors.blue;
  return colors.violet;
};

export const VisualizerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.bg};
  justify-content: space-evenly;
  max-width: 600px;
  margin: auto;
`;

export const ProfileColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DotsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: flex-end;
  height: 65px;
`;

export const DotStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const IntervalNumber = styled.span`
  font-size: 0.65rem;
  font-weight: bold;
  color: ${({ $interval, theme, $isActive, $isAvoid }) =>
    $isActive
      ? getIntervalColor($interval, theme.colors, $isAvoid)
      : theme.colors.text};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};
  transition: ${({ theme }) => theme.transitions.default};
`;

export const ToneDot = styled.div`
  width: ${({ theme }) => theme.sizes.dot};
  height: ${({ theme }) => theme.sizes.dot};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ $interval, theme, $isAvoid }) =>
    getIntervalColor($interval, theme.colors, $isAvoid)};

  transition: ${({ theme }) => theme.transitions.bounce};
  transform: translateY(${({ $offset }) => $offset / 2}px);
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};

  box-shadow: ${({ $isExposed, $interval, theme, $isAvoid }) => {
    if (!$isExposed) return "none";
    const color = getIntervalColor($interval, theme.colors, $isAvoid);
    return `${theme.shadows.glow} ${color}`;
  }};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: ${({ theme }) => theme.sizes.dotXl};
    height: ${({ theme }) => theme.sizes.dotXl};
  }
`;

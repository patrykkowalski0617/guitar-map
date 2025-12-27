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
  gap: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.bg};
  justify-content: space-evenly;
`;

export const ProfileColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const DotsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: flex-end;
  height: 65px;
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const LegendLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  opacity: 0.7;
  white-space: nowrap;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
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

export const MainLabel = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-transform: uppercase;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.sm};
  width: 100%;

  strong {
    color: ${({ theme }) => theme.colors.yellow};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
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
`;

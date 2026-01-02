import styled from "styled-components";
import { Button, Label } from "../../parts";

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
  max-width: 700px;
  margin: auto;
  width: 100%;
`;
export const ProfileColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const ProfileRowWrapper = styled.div`
  min-width: 300px;
  ${Button} {
    margin: ${({ theme }) => theme.spacing.md} auto
      ${({ theme }) => theme.spacing.md};
  }
`;

export const DotsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  height: 65px;
  margin-top: ${({ theme }) => theme.spacing.md};
`;
export const DotStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const IntervalNumber = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  color: ${({ $interval, theme, $isRaised, $isAvoid }) =>
    $isRaised
      ? getIntervalColor($interval, theme.colors, $isAvoid)
      : theme.colors.text};
  opacity: ${({ $isRaised }) => ($isRaised ? 1 : 0.5)};
  transition: ${({ theme }) => theme.transitions.default};
  margin-top: 5px;
`;

export const ToneDot = styled.div`
  width: 25px;
  height: 25px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ $interval, theme, $isAvoid }) =>
    getIntervalColor($interval, theme.colors, $isAvoid)};
  transition: ${({ theme }) => theme.transitions.bounce};
  transform: translateY(
      ${({ $offset, $legendRender }) => ($legendRender ? 0 : $offset / 2)}px
    )
    rotate(${({ $isAltered }) => ($isAltered ? "45deg" : "0deg")});
  opacity: ${({ $isRaised, $legendRender }) =>
    $legendRender || $isRaised ? 1 : 0.2};
  box-shadow: ${({ $isExposed, $interval, theme, $isAvoid, $legendRender }) => {
    if (!$isExposed || $legendRender) return "none";
    const color = getIntervalColor($interval, theme.colors, $isAvoid);
    return `${theme.shadows.glow} ${color}`;
  }};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 27px;
    height: 27px;
  }
  cursor: ${({ $isRaised, $legendRender }) =>
    $isRaised && !$legendRender ? "pointer" : "default"};
`;

export const Description = styled.div`
  opacity: 0.8;
  text-align: center;
  max-width: 95%;
  line-height: 1.5;
  margin: 0 auto 20px;
  > span {
    color: ${({ theme }) => theme.colors.yellow};
  }
`;

export const VisLabel = styled(Label)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  > span {
    color: ${({ theme }) => theme.colors.yellow};
  }
`;

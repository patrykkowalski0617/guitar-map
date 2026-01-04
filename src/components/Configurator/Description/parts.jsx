import styled from "styled-components";

export const DescriptionText = styled.div`
  opacity: 0.8;
  line-height: 1.5;
  margin: 0 auto 20px;
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 80%;
    text-align: left;
    margin: 0 0 0 ${({ theme }) => theme.spacing.lg};
  }
`;

export const MarkedText = styled.span`
  color: ${({ theme }) => theme.colors.yellow};
`;

export const IntervalNumber = styled.span`
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  color: ${({ $interval, theme, $isAvoid, $isAltered }) => {
    if ($isAvoid) return theme.colors.red;
    if ($isAltered || $interval === 11 || $interval === 13)
      return theme.colors.violet;
    if ($interval === 3 || $interval === 7) return theme.colors.yellow;
    if ($interval === 9) return theme.colors.blue;
    return theme.colors.text;
  }};
`;

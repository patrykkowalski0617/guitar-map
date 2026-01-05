import styled from "styled-components";

export const MainWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

export const DescriptionText = styled.div`
  line-height: 1.5;
  margin: 0 auto 20px;
  text-align: center;
  color: ${({ theme }) => `${theme.colors.text}99`};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 85%;
    text-align: left;
    margin: 0 0 0 ${({ theme }) => theme.spacing.lg};
  }
`;

export const MarkedText = styled.span`
  font-weight: bold;
  color: ${({ theme }) => `${theme.colors.text}`};
`;

export const IntervalNumber = styled.span`
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  color: ${({ $interval, theme, $isAvoid, $isAltered }) => {
    if ($isAvoid) return theme.colors.text;
    if ($isAltered || $interval === 11 || $interval === 13)
      return theme.colors.text;
    if ($interval === 3 || $interval === 7) return theme.colors.text;
    if ($interval === 9) return theme.colors.text;
    return theme.colors.text;
  }};
`;

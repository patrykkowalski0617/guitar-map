import styled from "styled-components";

export const DisplayContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  margin: 0 auto;
  width: max-content;
  max-width: 100%;
`;

export const Label = styled.div`
  margin: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ $color, theme }) => $color || theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.default};
  text-transform: uppercase;
  position: relative;
  text-shadow: ${({ $isActive, $color, theme }) => {
    if (!$isActive) return "none";
    const shadowColor = $color || theme.colors.text;
    return `0 0 10px ${shadowColor}66`;
  }};
  opacity: ${({ $isActive, $opacityOff }) =>
    $opacityOff || $isActive ? 1 : 0.5};
  ${({ $isLegendLabel, theme }) =>
    $isLegendLabel ? `color: ${theme.colors.blue}; font-weight: bold` : ""}
`;

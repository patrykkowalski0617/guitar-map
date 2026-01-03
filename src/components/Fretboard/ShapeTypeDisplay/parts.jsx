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
  color: ${({ theme, $color, $progressRatio }) => {
    const baseColor = $color || theme.colors.text;
    const targetColor = "red";

    if (!$progressRatio || $progressRatio === 0) return baseColor;

    return `color-mix(in srgb, ${targetColor} ${
      $progressRatio * 100
    }%, ${baseColor})`;
  }};

  transition: color 0.3s ease;
`;

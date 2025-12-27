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
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ $color, theme }) => $color || theme.colors.text};

  text-shadow: ${({ $isActive, $color, theme }) => {
    if (!$isActive) return "none";
    const shadowColor = $color || theme.colors.text;
    return `0 0 10px ${shadowColor}66`;
  }};
  opacity: ${({ $isActive, $opacityOff }) =>
    $opacityOff || $isActive ? 1 : 0.5};
  font-size: ${({ theme }) => theme.fontSize.sm};
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.default};
  text-transform: uppercase;
`;

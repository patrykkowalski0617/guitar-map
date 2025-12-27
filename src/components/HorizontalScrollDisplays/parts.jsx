import styled from "styled-components";

export const DisplayContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;

  /* Centrowanie zawartości */
  margin: 0 auto;
  width: max-content;
  max-width: 100%;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &::before,
  &::after {
    content: "";
    flex: 0 0 10px;
  }
`;

export const Label = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  /* 1. Kolor: Użyj przekazanego $color, w przeciwnym razie domyślny tekst */
  color: ${({ $color, theme }) => $color || theme.colors.text};

  /* 2. Wyróżnienie: Wyraźny text-shadow w kolorze aktualnego tekstu */
  text-shadow: ${({ $isActive, $color, theme }) => {
    if (!$isActive) return "none";
    const shadowColor = $color || theme.colors.text;
    return `0 0 10px ${shadowColor}66`;
  }};

  /* Opacity: 1 dla active i 0.5 dla pozostałych */
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};

  font-size: ${({ theme }) => theme.fontSize.sm};
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.default};
  text-transform: uppercase;
`;

import styled from "styled-components";

export const SelectorContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  padding: 10px 0;
  overflow-x: auto;
  /* Ukrywamy scrollbar dla estetyki (opcjonalnie) */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Label = styled.div`
  padding: 6px 12px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : "transparent"};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow : theme.colors.text};
  font-size: 0.8rem;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.3s ease;
  border-radius: 4px; // dodane dla lepszego wyglądu tła
`;

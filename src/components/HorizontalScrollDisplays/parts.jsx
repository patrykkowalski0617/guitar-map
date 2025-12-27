import styled from "styled-components";

export const SelectorContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  padding: 10px 0;
  overflow-x: auto;

  /* Rozwiązanie problemu centrowania */
  margin: 0 auto;
  width: max-content;
  max-width: 100%;

  /* Jeśli Twoja wersja przeglądarki wspiera "safe", możesz odkomentować poniższe zamiast margin: auto */
  /* justify-content: safe center; */

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Dodatkowy padding na krawędziach, żeby skrolowanie do środka 
     nie przyklejało skrajnych elementów do samej krawędzi ekranu */
  &::before,
  &::after {
    content: "";
    flex: 0 0 10px;
  }
`;

export const Label = styled.div`
  padding: 6px 12px;
  border-radius: 4px; /* Dodano, żeby tło aktywnego elementu wyglądało schludnie */
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : "transparent"};
  text-shadow: ${({ $isActive, theme }) =>
    $isActive ? `0 0 10px ${theme.colors.yellow}44` : "none"};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow : theme.colors.text};
  font-size: 0.8rem;
  white-space: nowrap;
  transition: all 0.3s ease;
  cursor: pointer;
`;

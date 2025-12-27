import styled from "styled-components";

export const ShapePreviewContainer = styled.div`
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.sm};
  user-select: none;
  cursor: pointer;
  opacity: ${({ $isActive }) => ($isActive ? "1" : "0.3")};
  background-color: transparent;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgLight}44;
    opacity: 1;
  }
`;

export const ShapeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const StringRow = styled.div`
  display: flex;
  flex-direction: row;

  & > :last-child {
    border-right: none;
  }
`;

export const FretCell = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  /* Używamy mniejszego paddingu dla gęstszego podglądu */
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const Note = styled.div`
  outline: none;
  /* Podgląd używa stałych, małych wymiarów */
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};

  transition: ${({ theme }) => theme.transitions.default};

  /* Nuta w podglądzie jest albo jasna (aktywna), albo prawie niewidoczna */
  opacity: ${({ $isInShape }) => ($isInShape ? "1" : "0.05")};
  background-color: ${({ theme }) => theme.colors.text};

  /* Jeśli nuta jest w shape, dodajemy jej delikatny blask nawet w podglądzie */
  box-shadow: ${({ $isInShape, theme }) =>
    $isInShape ? `0 0 4px ${theme.colors.text}aa` : "none"};
`;

export const VariantLabel = styled.div`
  text-align: center;
  font-size: 0.65rem;
  text-transform: uppercase;
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;

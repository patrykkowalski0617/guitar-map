import styled, { css } from "styled-components";

export const FretboardContainer = styled.div`
  max-width: 100vw;
  overflow: auto;
  padding: ${({ theme }) => theme.spacing.md} 0;
  user-select: none;

  /* Stylizacja scrollbara dla zachowania estetyki DAW */
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.bgLight};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

export const StringRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Fret = css`
  max-width: 300px;
  width: calc(100% / ${({ $numOfCells }) => $numOfCells});
  min-width: 60px; /* Zwiększone minimalnie dla lepszej czytelności */
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.sizes.fretboardHeight};
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

export const FretCell = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  ${Fret}

  &:first-child {
    border-left: 2px solid ${({ theme }) => theme.colors.border}; /* Próg zerowy / siodełko */
  }
`;

export const FretCount = styled.div`
  ${Fret}
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  font-size: 0.7rem;
  font-weight: 600;
`;

export const FretboardLabelsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const CAGEDLetter = styled.span`
  cursor: pointer;
  width: ${({ theme }) => theme.sizes.controlsSm};
  height: ${({ theme }) => theme.sizes.controlsSm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  border: 2px solid ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.yellow};
  background: ${({ theme }) => theme.colors.bgLight};
`;

export const Note = styled.div`
  outline: none;
  cursor: pointer;
  /* Nuta jest nieco mniejsza niż wysokość progu, by "pływać" wewnątrz */
  width: 48px;
  height: ${({ theme }) => theme.sizes.controlsSm};
  border-radius: ${({ theme }) => theme.borderRadius.full};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;

  background: ${({ $isInUserShape, theme }) =>
    $isInUserShape ? theme.colors.green : theme.colors.bgLight};
  opacity: ${({ $isInShape, $isActiveShapeRootNote }) =>
    $isInShape || $isActiveShapeRootNote ? "1" : "0.1"};

  box-shadow: ${({ theme, $isInShape }) =>
    $isInShape ? `0 0 10px ${theme.colors.yellow}22` : "none"};

  border: 1px solid
    ${({ theme, $isInShape }) =>
      $isInShape ? theme.colors.yellow : theme.colors.border};

  color: ${({ theme }) => theme.colors.text};
`;

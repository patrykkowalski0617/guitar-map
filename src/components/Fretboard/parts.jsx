import styled, { css } from "styled-components";

export const FretboardContainer = styled.div`
  max-width: 100vw;

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
  min-width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.sizes.fretboardHeight};
  padding: ${({ theme }) => theme.spacing.xs};
`;

export const FretCell = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  ${Fret}

  &:first-child {
    border-left: 4px solid ${({ theme }) => theme.colors.border}; /* Próg zerowy / siodełko */
  }
`;

export const FretCount = styled.div`
  ${Fret}
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const FretboardLabelsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const CAGEDLetter = styled.span`
  outline: none;
  cursor: pointer;
  width: 31px;
  height: 31px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.bgLight};
  box-shadow: ${({ theme, $isInShape }) =>
    $isInShape ? `0 0 10px ${theme.colors.yellow}22` : "none"};
  border: 1px solid
    ${({ theme, $isInShape }) =>
      $isInShape ? theme.colors.yellow : theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

export const Note = styled.div`
  outline: none;
  cursor: pointer;
  width: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.md};
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
  transition: ${({ theme }) => theme.transitions.default};
  &:hover {
    border: 1px solid
      ${({ $isActiveShapeRootNote, theme }) =>
        $isActiveShapeRootNote ? theme.colors.yellow : theme.colors.border};
  }
`;

import styled, { css } from "styled-components";

export const FretboardContainer = styled.div`
  width: 100%;
  user-select: none;
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
    border-left: 4px solid ${({ theme }) => theme.colors.border};
  }
`;

export const FretCount = styled.div`
  ${Fret}
  user-select: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const FretboardLabelsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const fretboardButtonStyles = css`
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  text-transform: uppercase;
  box-shadow: ${({ theme, $isInShape }) =>
    $isInShape ? `0 0 10px ${theme.colors.yellow}66` : "none"};
  border: 2px solid
    ${({ theme, $isInShape }) =>
      $isInShape ? theme.colors.yellow : theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
  line-height: 0;
`;

export const CAGEDLetter = styled.div`
  width: 31px;
  height: 31px;
  ${fretboardButtonStyles}
  border: 1px solid
    ${({ $isCAGED_hoverShapeLocked, theme }) =>
    $isCAGED_hoverShapeLocked ? theme.colors.yellow : "initial"};
  background: ${({ $isCAGED_hoverShapeLocked, theme }) =>
    $isCAGED_hoverShapeLocked ? theme.colors.green : theme.colors.bgLight};
`;

export const Note = styled.div`
  width: 48px;
  height: 31px;
  position: relative;

  opacity: ${({
    $isInShape,
    $isActiveShapeRootNote,
    $isInCAGED_hoverShape,
    $isShapeLocked,
  }) =>
    $isActiveShapeRootNote || $isInShape || $isShapeLocked
      ? "1"
      : $isInCAGED_hoverShape
      ? "0.4"
      : "0.1"};

  cursor: ${({ $isActiveShapeRootNote }) =>
    $isActiveShapeRootNote ? "pointer" : "default"};

  ${fretboardButtonStyles}

  &:hover {
    border: 1px solid
      ${({ $isActiveShapeRootNote, theme }) =>
        $isActiveShapeRootNote ? theme.colors.yellow : theme.colors.border};
  }

  outline: ${({ theme, $isShapeLocked }) =>
    $isShapeLocked ? `2px solid ${theme.colors.violet}ee` : "none"};
  outline-offset: 2px;

  background: ${({
    theme,
    $isInDevModeShape,
    $isActiveShapeRootNote,
    $isInShape,
    $isSaved,
  }) => {
    if ($isSaved && $isInShape) return theme.colors.yellow;
    if ($isInDevModeShape) return theme.colors.red;
    if ($isActiveShapeRootNote) return theme.colors.green;
    return theme.colors.bgLight;
  }};

  color: ${({ theme, $isInShape, $isSaved }) => {
    if ($isSaved && $isInShape) return theme.colors.bg;
  }};
`;

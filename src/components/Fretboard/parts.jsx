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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs};
`;

export const FretCell = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  ${Fret}

  &:first-child {
    border-left: 4px solid ${({ theme }) => theme.colors.border};
    min-width: 46px;
  }
`;

export const FretboardLabelsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const fretboardButtonStyles = css`
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-transform: uppercase;
  box-shadow: ${({ theme, $isInShape }) =>
    $isInShape ? `0 0 5px ${theme.colors.text}66` : "none"};
  border: 3px solid
    ${({ theme, $isInShape }) =>
      $isInShape ? `${theme.colors.text}66` : theme.colors.border};

  ${({ theme, $isInShape, $isActiveShapeRootNote }) =>
    !$isInShape && $isActiveShapeRootNote
      ? `border: 3px solid ${theme.colors.text}00`
      : ""};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
  height: 29px;
`;

export const FretCount = styled.div`
  ${Fret}
  font-size: ${({ theme }) => theme.fontSize.sm};
  user-select: none;
  height: 27px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CAGEDLetter = styled.div`
  ${fretboardButtonStyles}
  width: 28px;
  border: 1px solid
    ${({ $isCAGED_hoverShapeLocked, theme }) =>
      $isCAGED_hoverShapeLocked ? theme.colors.text : theme.colors.bg};
  background: ${({ $isCAGED_hoverShapeLocked, theme }) =>
    $isCAGED_hoverShapeLocked ? theme.colors.bg : theme.colors.bg};
`;

export const Note = styled.div`
  width: 33px;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 48px;
  }
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
      : "0.12"};

  cursor: ${({ $isActiveShapeRootNote }) =>
    $isActiveShapeRootNote ? "pointer" : "default"};
  ${fretboardButtonStyles}

  &:hover {
    border: 3px solid
      ${({ $isActiveShapeRootNote, $isInShape, theme }) =>
        $isInShape || $isActiveShapeRootNote
          ? `${theme.colors.text}66`
          : theme.colors.border};
  }

  outline: ${({ theme, $isShapeLocked }) =>
    $isShapeLocked ? `4px solid ${theme.colors.contrast}` : "none"};
  outline-offset: 2px;

  background: ${({
    theme,
    $isInDevModeShape,
    $isActiveShapeRootNote,
    $isInShape,
    $isSaved,
  }) => {
    if ($isSaved && $isInShape) return theme.colors.alert;
    if ($isInDevModeShape) return theme.colors.alert;
    if ($isActiveShapeRootNote) return `${theme.colors.markerBg}30`;
    return theme.colors.bgLight;
  }};

  color: ${({ theme, $isInShape, $isSaved }) => {
    if ($isSaved && $isInShape) return theme.colors.bg;
  }};
`;

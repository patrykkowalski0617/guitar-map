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
  background: ${({
    $isInUserShape,
    $isActiveShapeRootNote,
    $isInShape,
    theme,
  }) => {
    if ($isInUserShape) return theme.colors.red;
    if ($isActiveShapeRootNote && $isInShape) return theme.colors.green;
    return theme.colors.bgLight;
  }};
  box-shadow: ${({ theme, $isInShape }) =>
    $isInShape ? `0 0 10px ${theme.colors.yellow}22` : "none"};

  border: 1px solid
    ${({ theme, $isInShape }) =>
      $isInShape ? theme.colors.yellow : theme.colors.border};

  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
  line-height: 0;
`;

export const CAGEDLetter = styled.div`
  width: 31px;
  height: 31px;
  cursor: pointer;
  ${fretboardButtonStyles}
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.yellow};
  }
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
  opacity: ${({ $isInShape, $isActiveShapeRootNote, $isInCAGED_hoverShape }) =>
    $isActiveShapeRootNote || $isInShape
      ? "1"
      : $isInCAGED_hoverShape
      ? "0.4"
      : "0.1"};

  cursor: ${({ $isActiveShapeRootNote }) =>
    $isActiveShapeRootNote ? "pointer" : "default"};

  ${fretboardButtonStyles}

  &::after {
    content: "${({ $variantLabel }) => $variantLabel || ""}";
    display: ${({ $variantLabel }) => ($variantLabel ? "flex" : "none")};
    position: absolute;
    top: -3px;
    right: -20px;
    color: ${({ theme, $isError }) =>
      $isError ? theme.colors.red || "#ff4444" : theme.colors.green};
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    width: 20px;
    height: 10px;
  }

  &:hover {
    border: 1px solid
      ${({ $isActiveShapeRootNote, theme }) =>
        $isActiveShapeRootNote ? theme.colors.yellow : theme.colors.border};
  }
`;

import styled, { css } from "styled-components";

export const FretboardContainer = styled.div`
  user-select: none;
  width: 100%;
`;

export const StringRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  width: 100%;
`;

const Fret = css`
  max-width: 80px;
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
    border-right: 4px solid ${({ theme }) => theme.colors.border};
  }
  &:last-child {
    border: none;
  }
`;

export const FretCount = styled.div`
  ${Fret}
  font-size: ${({ theme }) => theme.fontSize.sm};
  user-select: none;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  opacity: 0.5;
  margin-top: 10px;
  position: relative;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -13px;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.text};
    pointer-events: none;
  }

  ${({ $dotType }) => {
    if ($dotType === "single") {
      return css`
        &::before {
          left: 50%;
          transform: translateX(-50%);
        }
        &::after {
          display: none;
        }
      `;
    }
    if ($dotType === "double") {
      return css`
        &::before {
          left: 50%;
          transform: translateX(-140%);
        }
        &::after {
          left: 50%;
          transform: translateX(40%);
        }
      `;
    }
    return css`
      &::before,
      &::after {
        display: none;
      }
    `;
  }}
`;

export const FretboardLabelsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  width: 100%;
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
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
  height: 29px;
`;

export const CAGEDLetter = styled.div`
  ${fretboardButtonStyles}
  width: 25px;
  height: 10px;
  border-radius: unset;
  font-size: ${({ theme }) => theme.fontSize.xs};
  border: 1px solid
    ${({ $isCAGED_hoverShapeLocked, theme }) =>
      $isCAGED_hoverShapeLocked ? theme.colors.text : theme.colors.bg};
  border-bottom: none;
  border-top: none;
  background: ${({ $isCAGED_hoverShapeLocked, theme }) =>
    $isCAGED_hoverShapeLocked ? theme.colors.bg : theme.colors.bg};
`;

const addAlpha = (color, opacity) => {
  // Jeśli kolor ma już alfę (np. markerBg z tabeli), lub nie jest hexem, zwracamy jak jest
  if (!color.startsWith("#") || color.length > 7) return color;
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${color}${alpha}`;
};

export const Note = styled.div`
  ${fretboardButtonStyles}
  width: 33px;
  position: relative;
  outline-offset: 2px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 48px;
  }

  ${({
    theme,
    $isInDevModeShape,
    $isActiveShapeRootNote,
    $isInShape,
    $isSaved,
    $isShapeLocked,
    $isInCAGED_hoverShape,
  }) => {
    // --- KROK 1: USTALAMY OPACITY (ALFA) ---
    let currentAlpha = 0.12;

    if (
      $isInDevModeShape ||
      $isInShape ||
      $isActiveShapeRootNote ||
      ($isSaved && $isInShape)
    ) {
      currentAlpha = 1;
    } else if ($isInCAGED_hoverShape) {
      currentAlpha = 0.4;
    }

    // --- KROK 2: USTALAMY KOLORY BAZOWE ---
    let bgColor = theme.colors.bgLight;
    let textColor = theme.colors.text;
    let borderColor = theme.colors.border;
    let shadow = "none";
    let cursor = "default";

    if ($isInDevModeShape) {
      bgColor = theme.colors.contrast;
      shadow = `0 0 0 2px ${theme.colors.bg}`;
    } else if ($isSaved && $isInShape) {
      bgColor = theme.colors.alert;
      textColor = theme.colors.bg;
      shadow = `0 0 0 2px ${theme.colors.bg}`;
    } else if ($isActiveShapeRootNote) {
      cursor = "pointer";
      shadow = `0 0 0 2px ${theme.colors.bg}`;

      // NOWA LOGIKA DLA ROOT:
      if ($isInShape) {
        // Root wewnątrz kształtu - mocniejszy, wyraźny kolor
        bgColor = `${theme.colors.markerBg}aa`;
      } else {
        // Root poza kształtem - Twoja pierwotna alfa 44 (jaśniejszy)
        bgColor = `${theme.colors.markerBg}22`;
      }
    } else if ($isInShape) {
      shadow = `0 0 0 2px ${theme.colors.bg}`;
    }

    // --- KROK 3: MODYFIKATOR LOCKED ---
    const outline = $isShapeLocked
      ? `3px solid ${theme.colors.contrast}`
      : "none";

    return css`
      background: ${bgColor.length > 7
        ? bgColor
        : addAlpha(bgColor, currentAlpha)};
      color: ${addAlpha(textColor, currentAlpha)};
      border: 1px solid ${addAlpha(borderColor, currentAlpha)};
      outline: ${outline};
      box-shadow: ${shadow !== "none"
        ? addAlpha(shadow, currentAlpha)
        : "none"};
      cursor: ${cursor};
    `;
  }}
`;

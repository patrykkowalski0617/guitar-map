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

const withAlpha = (hexColor, alpha) => {
  // alpha od 0 do 1, zamieniamy na HEX 00-FF
  const hexAlpha = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hexColor}${hexAlpha}`;
};

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
    // Baza to 0.12 (zgodnie z tabelką CSV), stany aktywne 1, hover 0.4
    let currentAlpha = 0.12;

    if (
      $isInDevModeShape ||
      $isInShape ||
      $isActiveShapeRootNote ||
      ($isSaved && $isInShape)
    ) {
      currentAlpha = 1;
    } else if ($isInCAGED_hoverShape) {
      currentAlpha = 0.3;
    }

    // --- KROK 2: USTALAMY KOLORY BAZOWE ---
    let bgColor = theme.colors.bgLight;
    let textColor = theme.colors.text;
    let borderColor = theme.colors.border; // Wyciągamy border do zmiennej
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
      bgColor = `${theme.colors.markerBg}44`;
      cursor = "pointer";
      shadow = `0 0 0 2px ${theme.colors.bg}`;
    } else if ($isInShape) {
      shadow = `0 0 0 2px ${theme.colors.bg}`;
    }

    // --- KROK 3: MODYFIKATOR LOCKED ---
    const outline = $isShapeLocked
      ? `3px solid ${theme.colors.contrast}`
      : "none";

    return css`
      /* Background i Color z alfą */
      background: ${addAlpha(bgColor, currentAlpha)};
      color: ${addAlpha(textColor, currentAlpha)};

      /* BORDER z alfą - teraz będzie przygasał razem z resztą */
      border: 1px solid ${addAlpha(borderColor, currentAlpha)};

      /* OUTLINE - zawsze 100% (nie używa addAlpha), bo to osobna warstwa */
      outline: ${outline};

      /* Reszta */
      box-shadow: ${shadow !== "none"
        ? addAlpha(shadow, currentAlpha)
        : "none"};
      cursor: ${cursor};
    `;
  }}
`;

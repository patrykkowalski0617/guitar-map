import styled from "styled-components";

// Stałe kolorystyczne zgodne z Twoim projektem
const GRAY_MAIN = "#64748b";
const GRAY_DARK = "#475569";
const GRAY_LIGHT = "#94a3b8";

export const PreviewContainer = styled.div`
  padding: 10px;
  display: inline-block;
  background: transparent;
`;

export const PreviewStringRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PreviewFretCell = styled.div`
  /* Małe, stałe wymiary dla podglądu */
  width: 35px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Cieńsze struny i progi */
  border-right: 1px solid ${GRAY_LIGHT};
  border-bottom: 1px solid ${GRAY_MAIN};

  &:first-child {
    /* Imitacja siodełka (grubsza linia z lewej) */
    border-left: 3px solid ${GRAY_DARK};
  }
`;

export const PreviewNote = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;

  /* Wyśrodkowanie tekstu (opcjonalnie, jeśli chcesz wyświetlać miniaturowe litery) */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: bold;
  color: white;

  /* Logika wyświetlania: szary kolor dla zaznaczonych, opacity dla reszty */
  background-color: ${GRAY_DARK};
  opacity: ${({ $isSelected }) => ($isSelected ? "1" : "0.3")};

  /* Brak obramowań i hoverów w trybie preview */
  border: none;
  pointer-events: none;
`;

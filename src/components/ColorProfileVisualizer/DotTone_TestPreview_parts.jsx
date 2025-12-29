import styled from "styled-components";
import { ToneDot as StyledToneDot } from "./parts";

export const PreviewMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const PreviewGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* Zapewnia, że każda grupa zaczyna się od nowej linii, ale jej zawartość jest w rzędzie */
  width: 100%;
`;

export const GroupTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.65rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.3;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const PreviewItemsGrid = styled.div`
  display: flex;
  flex-direction: row; /* Wszystkie elementy w jednej linii */
  flex-wrap: wrap;
  gap: 25px;
  align-items: flex-start;
`;

export const LegendLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 9px;
  margin-top: 10px;
  text-align: center;
  width: 70px; /* Szerokość labela kontroluje odstępy między kropkami */
  line-height: 1.2;
  transition: opacity ${({ theme }) => theme.transitions.default};
  opacity: 0.4;
`;

export const LegendDotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px; /* Stała wysokość zapobiega skakaniu labela przy hoverze */

  ${StyledToneDot} {
    opacity: 0.2 !important;
    transition: transform ${({ theme }) => theme.transitions.bounce},
      opacity ${({ theme }) => theme.transitions.default};
  }
`;

export const LegendItem = styled.div`
  display: flex;
  flex-direction: column; /* Label pod kropką */
  align-items: center;
  cursor: help;

  &:hover {
    ${LegendLabel} {
      opacity: 1;
    }

    ${StyledToneDot} {
      opacity: 1 !important;
      /* Unoszenie o 10px w górę (Y) z zachowaniem rotacji */
      transform: translateY(-10px)
        rotate(${({ $isAltered }) => ($isAltered ? "45deg" : "0deg")}) !important;
    }
  }
`;

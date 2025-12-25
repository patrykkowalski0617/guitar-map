import styled, { css } from "styled-components";

const btnHoverEffect = css`
  &:hover {
    transform: scale(1.1);
  }
`;

export const FretboardContainer = styled.div`
  max-width: 100vw;
  overflow: auto;
  padding: 10px 0;
  user-select: none;
`;

export const StringRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Fret = css`
  max-width: 300px;
  width: calc(100% / ${({ $numOfCells }) => $numOfCells});
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  padding: 0 5px;
`;

export const FretCell = styled.div`
  border-right: 1px solid;
  ${Fret}
`;

export const FretCount = styled.div`
  ${Fret}
  cursor: pointer;
  user-select: none;
  padding-right: 5px;
  ${btnHoverEffect}
`;

export const FretboardLabelsWrapper = styled.div`
  margin-top: 5px;
`;
export const CAGEDLetter = styled.span`
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border: 3px solid;
`;

export const Note = styled.div`
  outline: none;
  cursor: pointer;
  width: 50px;
  height: 32px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  background: ${({ $isInUserShape }) => ($isInUserShape ? "#00ff00" : "unset")};
  ${btnHoverEffect}
  opacity: ${({ $isInShape, $isActiveShapeRootNote, $isAnyShapeActive }) =>
    $isInShape || (!$isAnyShapeActive && $isActiveShapeRootNote) ? "1" : "0.2"};
  border: 3px solid;
`;
export const StyledButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  display: block;
  margin: 10px auto;
`;

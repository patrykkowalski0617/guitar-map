import styled, { css } from "styled-components";

export const FretboardContainer = styled.div`
  max-width: 100vw;
  overflow: auto;
  padding: 20px 0;
`;

export const StringRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Fret = css`
  min-width: 70px;
  max-width: 300px;
  width: calc(100vw / ${({ $numOfCells }) => $numOfCells});
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
`;

export const FretCell = styled.div`
  border-right: 5px solid;
  ${Fret}
`;

export const FretCount = styled.div`
  ${Fret}
`;

export const Note = styled.button`
  outline: none;
  cursor: pointer;

  width: 60px;
  height: 32px;
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
  background: ${({ $activeMarkerNote }) =>
    $activeMarkerNote ? "green" : "transparent"};
  &:hover {
    transform: scale(1.1);
  }

  border: ${({ $isInSet }) =>
    $isInSet ? "6px solid red" : "3px solid#64748b"};
`;

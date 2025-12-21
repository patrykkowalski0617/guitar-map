import styled from "styled-components";

const fretBorder = `5px solid`;

export const FretboardContainer = styled.div`
  max-width: 100vw;
  overflow: auto;
`;

export const StringRow = styled.div`
  display: flex;
  flex-direction: row;
`;
export const FretCell = styled.div`
  border-right: ${fretBorder};
  min-width: 70px;
  max-width: 300px;
  width: calc(100vw / ${({ $numOfCells }) => $numOfCells});
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
`;

export const Note = styled.button`
  outline: none;
  cursor: pointer;

  width: 32px;
  height: 32px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;

  transition: all 0.2s;
  z-index: 10;
  position: relative;

  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.1);
  }

  border: ${({ $isRootNote }) => ($isRootNote ? "2px solid gold" : "none")};
`;

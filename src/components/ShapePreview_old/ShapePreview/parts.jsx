import styled from "styled-components";

const GRAY_MAIN = "#64748b";
const GRAY_DARK = "#475569";
const GRAY_LIGHT = "#94a3b8";

export const PreviewContainer = styled.div`
  display: inline-block;
  background: transparent;
  border-top: 1px solid ${GRAY_LIGHT};
`;

export const PreviewStringRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PreviewFretCell = styled.div`
  width: 20px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-right: 1px solid ${GRAY_LIGHT};
  border-bottom: 1px solid ${GRAY_MAIN};

  &:first-child {
    border-left: 1px solid ${GRAY_DARK};
  }
`;

export const PreviewNote = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: bold;
  color: white;

  background-color: ${GRAY_DARK};
  opacity: ${({ $isInShape }) => ($isInShape ? "1" : "0")};

  border: none;
  pointer-events: none;
`;

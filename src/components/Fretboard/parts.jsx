import styled, { css } from "styled-components";

const CAGED_COLOR = "#ffcc00";
const DEFAULT_BORDER_COLOR = "#64748b";
const btnHoverEffect = css`
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

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
  border-right: 5px solid;
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
  color: ${CAGED_COLOR};
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
  color: #64748b;

  background: ${({ $isInUserShape }) =>
    $isInUserShape ? "green" : "transparent"};

  ${btnHoverEffect}

  opacity: ${({ $isInShape }) => ($isInShape ? "1" : "0.2")};

  border: 3px solid ${DEFAULT_BORDER_COLOR};
`;
export const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: #64748b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.2s;
  display: block;
  margin: 10px auto;

  &:hover {
    background-color: #475569;
  }

  &:active {
    transform: translateY(1px);
  }
`;

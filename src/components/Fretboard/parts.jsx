import styled from "styled-components";

const fretBorder = `5px solid`;

export const FretboardContainer = styled.div`
  border-left: ${fretBorder};
`;

export const StringRow = styled.div`
  display: flex;
  flex-direction: row;
`;
export const FretCell = styled.div`
  border-right: ${fretBorder};
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
`;

export const Note = styled.div``;

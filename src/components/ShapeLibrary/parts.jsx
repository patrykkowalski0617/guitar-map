import styled from "styled-components";

export const ShapePreviewContainer = styled.div`
  max-width: 400px;
  padding: 10px 0;
  user-select: none;
  cursor: pointer;
  padding: 10px;
`;
export const ShapeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StringRow = styled.div`
  display: flex;
  flex-direction: row;
  & > :last-child {
    border: none;
  }
`;

export const FretCell = styled.div`
  border-right: 1px solid;
  padding: 1px 2px;
`;

export const Note = styled.div`
  outline: none;
  cursor: pointer;
  width: 10px;
  height: 10px;
  border-radius: 30px;
  text-align: center;
  transition: 0.6s;
  opacity: ${({ $isInShape }) => ($isInShape ? "1" : "0.05")};
  background-color: ${({ theme }) => theme.colors.text};
`;

export const VariantLabel = styled.div`
  text-align: center;
  font-size: 0.7rem;
  margin-top: 5px;
`;

import styled from "styled-components";
export const ShapePreviewContainer = styled.div`
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.sm};
  user-select: none;
  cursor: pointer;
  opacity: ${({ $isActive }) => ($isActive ? "1" : "0.3")};
  background-color: transparent;
  transition: ${({ theme }) => theme.transitions.default};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bgLight}44;
    opacity: 1;
  }
`;
export const ShapeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const StringRow = styled.div`
  display: flex;
  flex-direction: row;
  & > :last-child {
    border-right: none;
  }
`;
export const FretCell = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bg};
`;
export const Note = styled.div`
  outline: none;
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: ${({ theme }) => theme.transitions.default};
  opacity: ${({ $isInShape }) => ($isInShape ? "1" : "0.05")};
  background-color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ $isInShape, theme }) =>
    $isInShape ? `0 0 4px ${theme.colors.text}aa` : "none"};
`;

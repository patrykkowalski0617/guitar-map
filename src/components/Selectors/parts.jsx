import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.bg};
`;
export const OptionButton = styled.button`
  white-space: nowrap;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? `${theme.colors.yellow}66` : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.yellow : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme, $active }) =>
    $active ? `0 0 15px ${theme.colors.yellow}22` : "none"};
  &:hover {
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.yellow : `${theme.colors.text}33`};
    box-shadow: ${({ theme }) => `0 0 10px ${theme.colors.text}22`};
  }
`;

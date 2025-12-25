import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px 0;
`;

export const Label = styled.span`
  text-transform: uppercase;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px;
  border-radius: 8px;
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.bgLight};
`;

export const OptionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.bg};
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.bg : theme.colors.bgLight};
  color: ${({ theme }) => theme.colors.text};
`;

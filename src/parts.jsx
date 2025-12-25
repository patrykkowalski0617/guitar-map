import styled from "styled-components";

export const AppWrapper = styled.div`
  min-height: 100vh;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
`;

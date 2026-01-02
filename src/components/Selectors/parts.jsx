import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.bg};
`;

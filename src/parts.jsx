import styled from "styled-components";

export const AppWrapper = styled.div`
  min-height: 100vh;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
`;

export const SectionContainer = styled.section`
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md}
    0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.violet}44;
  box-shadow: ${({ theme }) => `0 0 10px ${theme.colors.violet}22`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
export const SubSectionContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  opacity: 0.6;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-left: 3px solid ${({ theme }) => theme.colors.yellow};
  padding-left: ${({ theme }) => theme.spacing.sm};
`;

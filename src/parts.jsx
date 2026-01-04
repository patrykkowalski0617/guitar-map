import styled from "styled-components";

export const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} 50px`};
`;

export const SectionContainer = styled.section`
  margin: 60px auto 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `50px ${theme.spacing.md} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.blue}44;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  position: relative;
  max-width: 1400px;
  min-width: 0;
`;

export const SubSectionContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled.div`
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -20px;
  height: 40px;
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.blue}44;
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  > h2 {
    line-height: 1;
    margin: 0;
    letter-spacing: 2px;
    font-size: 22px;
    color: ${({ theme }) => `${theme.colors.blue}dd`};
    white-space: nowrap;
  }
`;

export const SubsectionTitle = styled.h3`
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  line-height: 1;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => `${theme.colors.blue}`};
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
  }
`;

export const Label = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-transform: uppercase;
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ theme }) => theme.spacing.xl};
    flex-direction: row;
    align-items: stretch;
    & > ${SectionContainer} {
      flex: 1 1 0;
    }
  }
`;

export const Button = styled.button`
  white-space: nowrap;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 37px;
  line-height: 1%;
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
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

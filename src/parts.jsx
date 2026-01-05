import styled from "styled-components";

export const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} 20px`};
`;

export const SectionContainer = styled.section`
  margin: 30px auto 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `50px ${theme.spacing.md} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
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
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  > h2 {
    line-height: 1;
    margin: 0;
    letter-spacing: 2px;
    font-size: 22px;
    color: ${({ theme }) => `${theme.colors.text}dd`};
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
  color: ${({ theme }) => `${theme.colors.text}99`};
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

export const Button = styled.button`
  white-space: nowrap;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  line-height: 1;
  text-align: center;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? `${theme.colors.border}` : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : `${theme.colors.text}99`};
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme, $active }) =>
    $active ? `0 0 10px ${theme.colors.border}` : "none"};
  &:hover {
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.text : `${theme.colors.border}`};
    box-shadow: ${({ theme }) => `0 0 10px ${theme.colors.border}`};
  }
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

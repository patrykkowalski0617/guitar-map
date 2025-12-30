import styled from "styled-components";

export const AppWrapper = styled.div`
  min-height: 100vh;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing?.lg || "20px"};
`;

export const SectionContainer = styled.section`
  margin: 60px auto 0;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `50px ${theme.spacing.md} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.blue}44;
  box-shadow: ${({ theme }) => `0 0 10px ${theme.colors.blue}22`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  position: relative;
`;
export const SubSectionContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled.div`
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -15px;
  height: 35px;
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => `0 0 10px ${theme.colors.blue}22`};
  border: 1px solid ${({ theme }) => theme.colors.blue}44;
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  > h2 {
    line-height: 1;
    margin: 0;
    letter-spacing: 2px;
    font-size: 22px;
    color: ${({ theme }) => `${theme.colors.blue}77`};
    white-space: nowrap;
  }
`;

export const SubsectionTitle = styled.h3`
  text-transform: uppercase;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  line-height: 1;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => `${theme.colors.blue}99`};
`;

export const UnderLabel = styled.div`
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
  max-width: 1200px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing?.lg || "20px"};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: stretch;
    & > ${SectionContainer} {
      flex: 1;
      width: 0;
      min-width: 50%;
      max-width: none;
      margin-left: 0;
      margin-right: 0;
      margin-top: 60px;
    }
  }
`;

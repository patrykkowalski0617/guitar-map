import styled from "styled-components";

export const PreviewMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.bg};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const GroupTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.65rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const LegendLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;
  opacity: 0.8;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1;
  ${({ $isLegendLabel, theme }) =>
    $isLegendLabel ? `color: ${theme.colors.blue}; font-weight: bold;` : ""}
  opacity: ${({ $isActive, $opacityOff }) =>
    $opacityOff || $isActive ? 1 : 0.5};
`;

export const LegendItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.lg};
`;

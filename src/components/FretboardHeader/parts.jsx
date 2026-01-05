import styled from "styled-components";
import { Button, SubsectionTitle } from "../../parts";

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  max-width: 180px;
`;

export const StyledSubsectionTitle = styled(SubsectionTitle)`
  padding-left: 0;
  padding-right: 0;
`;

export const HeaderButton = styled(Button)`
  color: ${({ theme }) => `${theme.colors.text}ee`};
`;

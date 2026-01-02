import styled from "styled-components";
import { Button, Label, SubsectionTitle } from "../../parts";

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 0 20px;
  width: fit-content;
`;

export const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  max-width: 180px;
`;

export const RangeWrapper = styled.div`
  height: 37px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SequencerLabel = styled(Label)`
  font-size: 0.7rem;
  text-align: left;
  span {
    color: ${({ theme }) => theme.colors.yellow};
    float: right;
    margin-left: 10px;
  }
`;

export const StyledSubsectionTitle = styled(SubsectionTitle)`
  padding-left: 0;
  padding-right: 0;
`;

export const StyledSelect = styled.select`
  appearance: none;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.bgLight};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  height: 37px;
  &:hover:not(:disabled) {
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.yellow : `${theme.colors.text}33`};
    box-shadow: ${({ theme }) => `0 0 10px ${theme.colors.text}22`};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledRange = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.bgLight};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  outline: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    background: ${({ theme }) => theme.colors.yellow};
    border-radius: 50%;
    transition: ${({ theme }) => theme.transitions.default};
  }
`;

export const SequencerButton = styled(Button)`
  width: 140px;
  opacity: ${({ $isLocked }) => ($isLocked ? 0.7 : 1)};
  cursor: ${({ $isLocked }) => ($isLocked ? "not-allowed" : "pointer")};
`;

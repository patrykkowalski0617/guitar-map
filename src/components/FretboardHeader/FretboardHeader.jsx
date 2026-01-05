import { useStore } from "../../store/useStore";
import { SubSectionContainer } from "../../parts";
import { HeaderButton, SettingGroup, SettingsContainer } from "./parts";
import RandomChallengeButton from "../RandomBtn/RandomBtn";

const FretboardHeader = ({
  lockedShape,
  toggleLockShape,
  setLockedShape,
  setLockedCAGEDLetter,
  handleNoteClick,
}) => {
  const shape = useStore((state) => state.shape);

  const isFrozen = lockedShape && lockedShape.length > 0;

  return (
    <SubSectionContainer>
      <SettingsContainer>
        <SettingGroup>
          <HeaderButton
            $active={isFrozen}
            onClick={toggleLockShape}
            disabled={!isFrozen && shape.length === 0}
          >
            {isFrozen ? "UNLOCK SHAPE" : "LOCK SHAPE"}
          </HeaderButton>
        </SettingGroup>

        <SettingGroup>
          <RandomChallengeButton
            setLockedShape={setLockedShape}
            setLockedCAGEDLetter={setLockedCAGEDLetter}
            handleNoteClick={handleNoteClick}
          />
        </SettingGroup>
      </SettingsContainer>
    </SubSectionContainer>
  );
};

export default FretboardHeader;

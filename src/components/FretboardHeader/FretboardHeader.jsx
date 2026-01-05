import { useStore } from "../../store/useStore";
import { Button, SubSectionContainer } from "../../parts";
import { SettingGroup, SettingsContainer } from "./parts";
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
          <Button
            $active={isFrozen}
            onClick={toggleLockShape}
            disabled={!isFrozen && shape.length === 0}
          >
            {isFrozen ? "UNLOCK SHAPE" : "LOCK SHAPE"}
          </Button>
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

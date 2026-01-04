import { useStore } from "../../store/useStore";
import { SubSectionContainer } from "../../parts";
import { HeaderButton, SettingGroup, SettingsContainer } from "./parts";

const FretboardHeader = ({ lockedShape, toggleLockShape }) => {
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
      </SettingsContainer>
    </SubSectionContainer>
  );
};

export default FretboardHeader;

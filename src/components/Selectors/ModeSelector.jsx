import { useStore } from "../../store/useStore";
import Selector from "./Selector";

const MODE_OPTIONS = ["Major", "Minor"];

const ModeSelector = () => {
  const mode = useStore((state) => state.mode);
  const setMode = useStore((state) => state.setMode);

  const handleModeChange = (selectedMode) => {
    // Prosta zmiana stringa w stanie
    setMode(selectedMode);
  };

  return (
    <Selector
      label="Mode DISP MOBILE"
      options={MODE_OPTIONS}
      value={mode}
      onChange={handleModeChange}
    />
  );
};

export default ModeSelector;

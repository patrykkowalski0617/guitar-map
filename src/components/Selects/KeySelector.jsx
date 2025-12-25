import { UNIFIED_MUSIC_KEYS } from "../../data/data";
import { useMusicStore } from "../../store/useMusicStore";
import Selector from "./Selector";

const KeySelector = () => {
  const tuneKey = useMusicStore((state) => state.tuneKey);
  const setTuneKey = useMusicStore((state) => state.setTuneKey);

  const keyOptions = UNIFIED_MUSIC_KEYS.map((k) => k.label);

  const handleKeyChange = (selectedString) => {
    const selectedObject = UNIFIED_MUSIC_KEYS.find(
      (k) => k.label === selectedString
    );

    if (selectedObject) {
      setTuneKey(selectedObject);
    }
  };

  return (
    <Selector
      label="Unified Keys"
      options={keyOptions}
      value={tuneKey?.label}
      onChange={handleKeyChange}
    />
  );
};

export default KeySelector;

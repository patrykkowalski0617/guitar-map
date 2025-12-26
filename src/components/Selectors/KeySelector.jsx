import { UNIFIED_MUSIC_KEYS } from "../../data/notes";
import { useStore } from "../../store/useStore";
import Selector from "./Selector";

const KeySelector = () => {
  const tuneKey = useStore((state) => state.tuneKey);
  const setTuneKey = useStore((state) => state.setTuneKey);

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
      isCompact={true}
    />
  );
};

export default KeySelector;

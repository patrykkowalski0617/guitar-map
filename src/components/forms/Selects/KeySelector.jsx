import { UNIFIED_MUSIC_KEYS } from "../../../music-theory";
import { useMusicStore } from "../../../store/useMusicStore";
import SegmentedSelect from "./SegmentedSelect";

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
    <SegmentedSelect
      label="Unified Keys"
      options={keyOptions}
      value={tuneKey?.label}
      onChange={handleKeyChange}
    />
  );
};

export default KeySelector;

import { UNIFIED_MUSIC_KEYS } from "../../data";
import { useStore } from "../../store/useStore";
import Selector from "./Selector";

const KeySelector = () => {
  const { tuneKey, setTuneKey } = useStore();

  const keyOptions = UNIFIED_MUSIC_KEYS.map((k) => ({
    label: k.label,
    value: k.label,
  }));

  const handleKeyChange = (selectedLabel) => {
    const selectedObject = UNIFIED_MUSIC_KEYS.find(
      (k) => k.label === selectedLabel
    );
    if (selectedObject) setTuneKey(selectedObject);
  };

  return (
    <Selector
      options={keyOptions}
      value={tuneKey?.label}
      onChange={handleKeyChange}
      isCompact={true}
      title={"Unified Keys"}
    />
  );
};

export default KeySelector;

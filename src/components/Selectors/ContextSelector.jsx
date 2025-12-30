import { useStore } from "../../store/useStore";
import Selector from "./Selector";
import { musicFunctionContextSelectorData } from "../../data/data";

const ContextSelector = () => {
  const { activeMusicContext, setActiveMusicContextByName } = useStore();

  const contextOptions = musicFunctionContextSelectorData.map((item) => ({
    label: item.FunctionContextName,
    value: item.FunctionContextName, // value i label są takie same
  }));

  return (
    <Selector
      label="Context"
      options={contextOptions}
      value={activeMusicContext?.FunctionContextName}
      onChange={setActiveMusicContextByName}
    />
  );
};

export default ContextSelector;

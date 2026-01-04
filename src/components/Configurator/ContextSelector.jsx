import { useStore } from "../../store/useStore";
import Selector from "./Selector";
import { musicFunctionContextSelectorData } from "../../data";

const ContextSelector = () => {
  const { activeMusicContext, setActiveMusicContextById } = useStore();

  const contextOptions = musicFunctionContextSelectorData.map((item) => ({
    label: item.FunctionContextName,
    value: item.id,
  }));

  return (
    <Selector
      options={contextOptions}
      value={activeMusicContext?.id}
      onChange={setActiveMusicContextById}
      title={"Function Context"}
    />
  );
};

export default ContextSelector;

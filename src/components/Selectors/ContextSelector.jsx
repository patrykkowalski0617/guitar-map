import { useStore } from "../../store/useStore";
import Selector from "./Selector";
import { musicFunctionContextSelectorData } from "../../data/data";

const ContextSelector = () => {
  const activeMusicContext = useStore((state) => state.activeMusicContext);
  const setActiveMusicContextByName = useStore(
    (state) => state.setActiveMusicContextByName
  );

  const contextOptions = musicFunctionContextSelectorData.map(
    (item) => item.FunctionContextName
  );

  return (
    <>
      <Selector
        label="Context - Unified Functions"
        options={contextOptions}
        value={activeMusicContext?.FunctionContextName}
        onChange={setActiveMusicContextByName}
      />
    </>
  );
};

export default ContextSelector;

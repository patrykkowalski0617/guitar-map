import { useStore } from "../../store/useStore";
import { harmonicFunctionDescription } from "../../data/data";
import HorizontalScrollDisplay from "./HorizontalScrollDisplay";

const HarmonicFunctionHorizontalScrollDisplay = () => {
  const activeMusicContext = useStore((state) => state.activeMusicContext);

  const currentActiveFunction = activeMusicContext?.harmonicFunctionDescription;

  const allFunctions = Object.values(harmonicFunctionDescription).map(
    (func) => ({
      id: func,
      label: func,
    })
  );

  return (
    <HorizontalScrollDisplay
      items={allFunctions}
      activeId={currentActiveFunction}
    />
  );
};

export default HarmonicFunctionHorizontalScrollDisplay;

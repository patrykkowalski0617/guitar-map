import { useStore } from "../../store/useStore";
import { harmonicFunctionDescription } from "../../data/data";
import HorizontalScrollDisplay from "./HorizontalScrollDisplay";
import { SubsectionTitle } from "../../parts";

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
    <>
      <SubsectionTitle>Context Feeling</SubsectionTitle>
      <HorizontalScrollDisplay
        items={allFunctions}
        activeId={currentActiveFunction}
      />
    </>
  );
};

export default HarmonicFunctionHorizontalScrollDisplay;

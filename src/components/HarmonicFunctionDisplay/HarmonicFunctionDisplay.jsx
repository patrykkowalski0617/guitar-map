import { useStore } from "../../store/useStore";
import { harmonicFunctionDescription } from "../../data/data";
import * as S from "./parts";

const HarmonicFunctionDisplay = () => {
  const activeMusicContext = useStore((state) => state.activeMusicContext);

  const currentActiveFunction = activeMusicContext?.harmonicFunctionDescription;

  const allFunctions = Object.values(harmonicFunctionDescription);

  return (
    <S.Container>
      {allFunctions.map((funcName) => (
        <S.FunctionItem
          key={funcName}
          $isActive={funcName === currentActiveFunction}
        >
          {funcName}
        </S.FunctionItem>
      ))}
    </S.Container>
  );
};

export default HarmonicFunctionDisplay;

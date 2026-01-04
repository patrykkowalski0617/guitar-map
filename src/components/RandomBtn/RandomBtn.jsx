import { useStore } from "../../store/useStore";
import {
  UNIFIED_MUSIC_KEYS,
  musicFunctionContextSelectorData,
} from "../../data";
import styled from "styled-components";

const StyledRandomBtn = styled.button`
  padding: 10px 20px;
  color: black;
`;

const RandomChallengeButton = () => {
  const store = useStore();

  const handleRandomize = () => {
    console.group("🚀 KROK: KEY + 2 DIFFERENT DESCRIPTIONS + SHAPES");

    const randomKey =
      UNIFIED_MUSIC_KEYS[Math.floor(Math.random() * UNIFIED_MUSIC_KEYS.length)];
    store.setTuneKey(randomKey);

    const ctx1 =
      musicFunctionContextSelectorData[
        Math.floor(Math.random() * musicFunctionContextSelectorData.length)
      ];

    const differentDescContexts = musicFunctionContextSelectorData.filter(
      (ctx) =>
        ctx.harmonicFunctionDescription !== ctx1.harmonicFunctionDescription
    );

    const ctx2 =
      differentDescContexts[
        Math.floor(Math.random() * differentDescContexts.length)
      ];

    const shape1 = ctx1.shapes[Math.floor(Math.random() * ctx1.shapes.length)];
    const shape2 = ctx2.shapes[Math.floor(Math.random() * ctx2.shapes.length)];

    store.setActiveMusicContextById(ctx1.id);
    store.setActiveMusicContextById(ctx2.id);

    console.log("Wylosowany klucz:", randomKey.label);
    console.log(
      "Context 1:",
      ctx1.id,
      "| Desc:",
      ctx1.harmonicFunctionDescription,
      "| Shape 1:",
      shape1
    );
    console.log(
      "Context 2:",
      ctx2.id,
      "| Desc:",
      ctx2.harmonicFunctionDescription,
      "| Shape 2:",
      shape2
    );

    console.groupEnd();
  };

  return (
    <StyledRandomBtn onClick={handleRandomize}>
      Losuj Klucz i Contexty
    </StyledRandomBtn>
  );
};

export default RandomChallengeButton;

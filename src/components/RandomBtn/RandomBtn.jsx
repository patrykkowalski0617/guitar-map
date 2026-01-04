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
    console.group("🚀 KROK: KEY + 2 DIFFERENT DESCRIPTIONS");

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

    store.setActiveMusicContextById(ctx1.id);

    const rootNote = useStore.getState().getActiveShapeRootNote();

    console.log("Wylosowany klucz:", randomKey.label);
    console.log(
      "Context 1:",
      ctx1.id,
      "| Desc:",
      ctx1.harmonicFunctionDescription
    );
    console.log(
      "Context 2:",
      ctx2.id,
      "| Desc:",
      ctx2.harmonicFunctionDescription
    );
    console.log("Root odczytany ze Store:", rootNote);

    console.groupEnd();
  };

  return (
    <StyledRandomBtn onClick={handleRandomize}>
      Losuj Klucz i Contexty
    </StyledRandomBtn>
  );
};

export default RandomChallengeButton;

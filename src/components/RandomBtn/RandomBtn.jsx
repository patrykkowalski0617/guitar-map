import { useStore } from "../../store/useStore";
import { UNIFIED_MUSIC_KEYS } from "../../data";
import styled from "styled-components";

const StyledRandomBtn = styled.button`
  padding: 10px 20px;
  color: black;
`;

const RandomChallengeButton = () => {
  const store = useStore();

  const handleRandomize = () => {
    console.group("🚀 KROK 1: TYLKO KEY");

    const randomKey =
      UNIFIED_MUSIC_KEYS[Math.floor(Math.random() * UNIFIED_MUSIC_KEYS.length)];

    store.setTuneKey(randomKey);
    const rootNote = useStore.getState().getActiveShapeRootNote();

    console.log("Wylosowany klucz:", randomKey.label);
    console.log("Root odczytany ze Store:", rootNote);

    console.groupEnd();
  };

  return (
    <StyledRandomBtn onClick={handleRandomize}>Losuj Klucz</StyledRandomBtn>
  );
};

export default RandomChallengeButton;

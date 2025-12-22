import Fretboard from "./components/Fretboard/Fretboard";
import "./App.css";
import MusicFunctionSelector from "./components/forms/Selects/MusicFunctionSelector";
import KeySelector from "./components/forms/Selects/KeySelector";
import { isSameShape, transposeShape } from "./utils/transposer";

function App() {
  const myOldShape = ["E1_A", "E1_B", "E1_C", "A2_E", "D3_A"];
  const target = "A2_D";

  // Wywołanie z dwoma argumentami
  const newShape = transposeShape(myOldShape, target);
  console.log(newShape);

  const isSame = isSameShape(myOldShape, newShape);
  console.log(isSame);

  return (
    <>
      <MusicFunctionSelector />
      <Fretboard />
      <KeySelector />
    </>
  );
}

export default App;

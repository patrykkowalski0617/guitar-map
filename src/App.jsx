import Fretboard from "./components/Fretboard/Fretboard";
import "./App.css";
import MusicFunctionSelector from "./components/forms/Selects/MusicFunctionSelector";
import KeySelector from "./components/forms/Selects/KeySelector";
import { isSameShape, transposeShape } from "./utils/transposer";
import ShapesLibrary from "./components/ShapePreview/ShapesLibrary";
import { isTestMode } from "./settings";

function App() {
  const myOldShape = ["E1_A", "E1_B", "E1_C", "A2_E", "D3_A"];
  const target = "E1_E";

  const newShape = transposeShape(myOldShape, target);

  const isSame = isSameShape(myOldShape, newShape);

  return (
    <>
      {isTestMode && <ShapesLibrary />}
      <MusicFunctionSelector />
      <Fretboard />
      <KeySelector />
    </>
  );
}

export default App;

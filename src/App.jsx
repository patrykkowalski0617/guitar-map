import Fretboard from "./components/Fretboard/Fretboard";
import "./App.css";
import KeySelector from "./components/Selects/KeySelector";
import ShapesLibrary from "./components/ShapePreview/ShapesLibrary";
import { isTestMode } from "./settings";
import ContextSelector from "./components/Selects/ContextSelector";

function App() {
  return (
    <>
      {isTestMode && <ShapesLibrary />}
      <ContextSelector />
      <Fretboard />
      <KeySelector />
    </>
  );
}

export default App;

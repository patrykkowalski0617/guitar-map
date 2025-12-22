import Fretboard from "./components/Fretboard/Fretboard";
import "./App.css";
import MusicFunctionManager from "./components/forms/Selects/MusicFunctionManager";
import KeySelector from "./components/forms/Selects/KeySelector";

function App() {
  return (
    <>
      <MusicFunctionManager />
      <Fretboard />
      <KeySelector />
    </>
  );
}

export default App;

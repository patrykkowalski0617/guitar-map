import Fretboard from "./components/Fretboard/Fretboard";
import KeySelector from "./components/Selects/KeySelector";
import ContextSelector from "./components/Selects/ContextSelector";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { AppWrapper } from "./parts";
import ModeSelector from "./components/Selects/ModeSelector";
import ShapesLibrary from "./components/ShapeLibrary/ShapeLibrary";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <ContextSelector />
        <ShapesLibrary />
        <ModeSelector />
        <Fretboard />
        <KeySelector />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

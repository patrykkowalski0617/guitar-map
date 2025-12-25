import Fretboard from "./components/Fretboard/Fretboard";
import KeySelector from "./components/Selects/KeySelector";
import ShapesLibrary from "./components/ShapePreview/ShapesLibrary";
import { isTestMode } from "./settings";
import ContextSelector from "./components/Selects/ContextSelector";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { AppWrapper } from "./parts";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        {isTestMode && <ShapesLibrary />}
        <ContextSelector />
        <Fretboard />
        <KeySelector />
      </AppWrapper>{" "}
    </ThemeProvider>
  );
}

export default App;

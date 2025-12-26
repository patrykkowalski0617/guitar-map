import Fretboard from "./components/Fretboard/Fretboard";
import KeySelector from "./components/Selectors/KeySelector";
import ContextSelector from "./components/Selectors/ContextSelector";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { AppWrapper, SectionContainer, SubSectionContainer } from "./parts";
import ModeSelector from "./components/Selectors/ModeSelector";
import ShapesLibrary from "./components/ShapeLibrary/ShapeLibrary";
import ShapeSelector from "./components/Selectors/ShapeSelector";
import HarmonicFunctionDisplay from "./components/HarmonicFunctionDisplay/HarmonicFunctionDisplay";
import ColorProfileVisualizer from "./components/ColorProfileVisualizer/ColorProfileVisualizer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <SectionContainer>
          <SubSectionContainer>
            <HarmonicFunctionDisplay />
          </SubSectionContainer>
          <SubSectionContainer>
            <ColorProfileVisualizer />
          </SubSectionContainer>
        </SectionContainer>
        <SectionContainer>
          <KeySelector />
          <ContextSelector />
          <ShapeSelector />
          {/* <ModeSelector /> */}
        </SectionContainer>
        <SectionContainer>
          <ShapesLibrary />
          <Fretboard />
        </SectionContainer>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

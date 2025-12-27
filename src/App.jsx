import Fretboard from "./components/Fretboard/Fretboard";
import KeySelector from "./components/Selectors/KeySelector";
import ContextSelector from "./components/Selectors/ContextSelector";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import {
  AppWrapper,
  SectionContainer,
  SectionTitle,
  SubSectionContainer,
} from "./parts";
import ShapesLibrary from "./components/ShapeLibrary/ShapeLibrary";
import ShapeSelector from "./components/Selectors/ShapeSelector";
import ColorProfileVisualizer from "./components/ColorProfileVisualizer/ColorProfileVisualizer";
import HarmonicFunctionHorizontalScrollDisplay from "./components/HorizontalScrollDisplays/HarmonicFunctionHorizontalScrollDisplay";
import ColorProfileHorizontalScrollDisplay from "./components/HorizontalScrollDisplays/ColorProfileHorizontalScrollDisplay";
import ShapeTypeHorizontalScrollDisplay from "./components/HorizontalScrollDisplays/ShapeTypeHorizontalScrollDisplay";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper>
        <SectionContainer>
          <SectionTitle>
            <h2>Visualizer</h2>
          </SectionTitle>
          <SubSectionContainer>
            <HarmonicFunctionHorizontalScrollDisplay />
          </SubSectionContainer>
          <SubSectionContainer>
            <ColorProfileVisualizer />
          </SubSectionContainer>
          <SubSectionContainer>
            <ColorProfileHorizontalScrollDisplay />
          </SubSectionContainer>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>
            <h2>Configurator</h2>
          </SectionTitle>
          <SubSectionContainer>
            <KeySelector />
          </SubSectionContainer>
          <SubSectionContainer>
            <ContextSelector />
          </SubSectionContainer>

          <SubSectionContainer>
            <ShapeSelector />
          </SubSectionContainer>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>
            <h2>Shape Library</h2>
          </SectionTitle>
          <SubSectionContainer>
            <ShapeTypeHorizontalScrollDisplay />
          </SubSectionContainer>
          <SubSectionContainer>
            <ShapesLibrary />
          </SubSectionContainer>
          <SubSectionContainer>
            <Fretboard />
          </SubSectionContainer>
        </SectionContainer>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

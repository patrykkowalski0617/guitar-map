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
import ShapeSelector from "./components/Selectors/ShapeSelector";
import ColorProfileVisualizer from "./components/ColorProfileVisualizer/ColorProfileVisualizer";
import HarmonicFunctionHorizontalScrollDisplay from "./components/HorizontalScrollDisplays/HarmonicFunctionHorizontalScrollDisplay";
import ShapeTypeHorizontalScrollDisplay from "./components/HorizontalScrollDisplays/ShapeTypeHorizontalScrollDisplay";
import GlobalStyle from "./GlobalStyle";
import VisualizerLegend from "./components/ColorProfileVisualizer/Legend/VisualizerLegend";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper>
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
            <h2>Visualizer</h2>
          </SectionTitle>
          <SubSectionContainer>
            <HarmonicFunctionHorizontalScrollDisplay />
          </SubSectionContainer>
          <SubSectionContainer>
            <ColorProfileVisualizer />
          </SubSectionContainer>
          <SubSectionContainer>
            <VisualizerLegend />
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
            <Fretboard />
          </SubSectionContainer>
        </SectionContainer>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

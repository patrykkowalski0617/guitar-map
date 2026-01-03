import Fretboard from "./components/Fretboard/Fretboard";
import KeySelector from "./components/Selectors/KeySelector";
import ContextSelector from "./components/Selectors/ContextSelector";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import {
  AppWrapper,
  RowWrapper,
  SectionContainer,
  SectionTitle,
  SubSectionContainer,
} from "./parts";
import ShapeSelector from "./components/Selectors/ShapeSelector";
import ColorProfileVisualizer from "./components/ColorProfileVisualizer/ColorProfileVisualizer";
import GlobalStyle from "./GlobalStyle";
import VisualizerLegend from "./components/ColorProfileVisualizer/Legend/VisualizerLegend";
import { useStore } from "./store/useStore";
import ShapeTypeDisplay from "./components/Fretboard/ShapeTypeDisplay/ShapeTypeDisplay";

function App() {
  const isProgressMode = useStore((state) => state.isProgressMode);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper>
        <RowWrapper>
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

          {!isProgressMode && (
            <SectionContainer>
              <SectionTitle>
                <h2>Visualizer</h2>
              </SectionTitle>
              <ColorProfileVisualizer />
              <SubSectionContainer>
                <VisualizerLegend />
              </SubSectionContainer>
            </SectionContainer>
          )}
        </RowWrapper>

        <SectionContainer>
          <SectionTitle>
            <h2>Shape Library</h2>
          </SectionTitle>
          <SubSectionContainer>
            <ShapeTypeDisplay />
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

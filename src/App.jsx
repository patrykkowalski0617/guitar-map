import Fretboard from "./components/Fretboard/Fretboard";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import {
  AppWrapper,
  RowWrapper,
  SectionContainer,
  SectionTitle,
  SubSectionContainer,
} from "./parts";
import GlobalStyle from "./GlobalStyle";
import { useStore } from "./store/useStore";
import ShapeTypeDisplay from "./components/Fretboard/ShapeTypeDisplay/ShapeTypeDisplay";
import Configurator from "./components/Configurator/Configurator";
import RobustTimer from "./components/Timer/Timer";

function App() {
  const isProgressMode = useStore((state) => state.isProgressMode);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isProgressMode && <RobustTimer />}
      <AppWrapper>
        <RowWrapper>
          <Configurator />
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

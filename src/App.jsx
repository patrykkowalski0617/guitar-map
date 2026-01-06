import Fretboard from "./components/Fretboard/Fretboard";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import {
  AppWrapper,
  SectionContainer,
  SectionTitle,
  SubSectionContainer,
} from "./parts";
import GlobalStyle from "./GlobalStyle";
import { useDevStore } from "./store/useDevStore";
import Configurator from "./components/Configurator/Configurator";
import RobustTimer from "./components/Timer/Timer";

function App() {
  const isProgressMode = useDevStore((state) => state.isProgressMode);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isProgressMode && <RobustTimer />}
      <AppWrapper>
        <SectionContainer>
          <SectionTitle>
            <h2>Shape Library</h2>
          </SectionTitle>
          <Configurator />

          <SubSectionContainer>
            <Fretboard />
          </SubSectionContainer>
        </SectionContainer>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

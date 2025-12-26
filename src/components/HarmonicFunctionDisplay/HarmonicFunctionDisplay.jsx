import styled from "styled-components";
import { useStore } from "../../store/useStore";
import { harmonicFunctionDescription } from "../../data/data";

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bgLight};
  border-radius: 8px;
  justify-content: center;
  margin-bottom: 15px;
`;

const FunctionItem = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  /* Kolorowanie zależne od tego, czy funkcja jest aktywna */
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow : theme.colors.text};

  /* Dodatkowe podkreślenie dla aktywnej funkcji */
  border-bottom: 2px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.colors.yellow : "transparent"};

  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.4)};
  transform: scale(${({ $isActive }) => ($isActive ? 1.1 : 1)});
`;

const HarmonicFunctionDisplay = () => {
  // Pobieramy aktualny kontekst ze store
  const activeMusicContext = useStore((state) => state.activeMusicContext);

  // Wyciągamy aktualną wartość opisu (np. "Motion")
  const currentActiveFunction = activeMusicContext?.harmonicFunctionDescription;

  // Tworzymy tablicę wszystkich dostępnych nazw funkcji do wyrenderowania
  const allFunctions = Object.values(harmonicFunctionDescription);

  return (
    <Container>
      {allFunctions.map((funcName) => (
        <FunctionItem
          key={funcName}
          $isActive={funcName === currentActiveFunction}
        >
          {funcName}
        </FunctionItem>
      ))}
    </Container>
  );
};

export default HarmonicFunctionDisplay;

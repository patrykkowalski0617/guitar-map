import { SubSectionContainer } from "../../parts";
import ShapeTypeDisplay from "../Fretboard/ShapeTypeDisplay/ShapeTypeDisplay";
import ContextSelector from "./ContextSelector";
import Description from "./Description/Description";
import KeySelector from "./KeySelector";
import ShapeSelector from "./ShapeSelector";

const Configurator = () => {
  return (
    <>
      <SubSectionContainer>
        <KeySelector />
      </SubSectionContainer>
      <SubSectionContainer>
        <ContextSelector />
      </SubSectionContainer>
      <SubSectionContainer>
        <ShapeSelector />
      </SubSectionContainer>
      <SubSectionContainer>
        <ShapeTypeDisplay />
      </SubSectionContainer>
      <SubSectionContainer>
        <Description />
      </SubSectionContainer>
    </>
  );
};

export default Configurator;

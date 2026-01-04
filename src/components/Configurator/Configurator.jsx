import {
  SectionContainer,
  SectionTitle,
  SubSectionContainer,
} from "../../parts";
import ContextSelector from "./ContextSelector";
import Description from "./Description/Description";
import KeySelector from "./KeySelector";
import ShapeSelector from "./ShapeSelector";

const Configurator = () => {
  return (
    <>
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
        <SubSectionContainer>
          <Description />
        </SubSectionContainer>
      </SectionContainer>
    </>
  );
};

export default Configurator;

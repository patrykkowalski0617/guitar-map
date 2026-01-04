import {
  SectionContainer,
  SectionTitle,
  SubSectionContainer,
} from "../../parts";
import { useStore } from "../../store/useStore";
import Description from "../ColorProfileVisualizer/Description";
import { Description as DescriptionParts } from "../ColorProfileVisualizer/parts";
import ContextSelector from "./ContextSelector";
import KeySelector from "./KeySelector";
import ShapeSelector from "./ShapeSelector";

const Configurator = () => {
  const { activeMusicContext, getNoteNameByOffset, getActiveShapeName } =
    useStore();

  const activeShapeName = getActiveShapeName();
  const majorRootName = getNoteNameByOffset(activeMusicContext.majorRoot);
  const minorRootName = getNoteNameByOffset(activeMusicContext.minorRoot);

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
          <DescriptionParts>
            <Description
              majorRootName={majorRootName}
              minorRootName={minorRootName}
              activeShapeName={activeShapeName}
            />
          </DescriptionParts>
        </SubSectionContainer>
      </SectionContainer>
    </>
  );
};

export default Configurator;

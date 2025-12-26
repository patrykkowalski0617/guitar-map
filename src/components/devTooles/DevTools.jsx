import CopyAbsoluteUserShapeButton from "./CopyAbsoluteUserShapeButton";
import CopyRelativeUserShapeButton from "./CopyRelativeUserShapeButton";
import { Container, DevToolsTitle } from "./parts";

const DevTools = ({ userShape, handleClearUserShape }) => {
  return (
    <>
      <DevToolsTitle>DevTools</DevToolsTitle>
      <Container>
        <CopyAbsoluteUserShapeButton
          userShape={userShape}
          handleClearUserShape={handleClearUserShape}
        />
        <CopyRelativeUserShapeButton
          userShape={userShape}
          handleClearUserShape={handleClearUserShape}
        />
      </Container>
    </>
  );
};

export default DevTools;

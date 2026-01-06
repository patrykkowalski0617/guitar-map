import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import CopyAbsoluteDevModeShapeButton from "./CopyAbsoluteDevModeShapeButton";
import CopyRelativeDevModeShapeButton from "./CopyRelativeDevModeShapeButton";
import CopyVariantIdButton from "./CopyVariantIdButton";
import { Container, DevToolsTitle } from "./parts";
import CopyFullSetDevModeShapeButton from "./CopyFullSetDevModeShapeButton";
import SecureVault from "./SecureVault";
// import EncryptorTool from "./EncryptorTool";

const DevTools = ({ devModeShape, handleClearDevModeShape }) => {
  const isDevMode = useStore((state) => state.isDevMode);
  const toggleDevMode = useStore((state) => state.toggleDevMode);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "d") {
        toggleDevMode();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleDevMode]);

  if (!isDevMode) return null;

  return (
    <>
      <DevToolsTitle>DevTools</DevToolsTitle>
      <Container>
        <CopyAbsoluteDevModeShapeButton
          devModeShape={devModeShape}
          handleClearDevModeShape={handleClearDevModeShape}
        />
        <CopyRelativeDevModeShapeButton
          devModeShape={devModeShape}
          handleClearDevModeShape={handleClearDevModeShape}
        />
        <CopyFullSetDevModeShapeButton
          devModeShape={devModeShape}
          handleClearDevModeShape={handleClearDevModeShape}
        />
        <CopyVariantIdButton />
        {/* <EncryptorTool /> */}
        <SecureVault />
      </Container>
    </>
  );
};

export default DevTools;

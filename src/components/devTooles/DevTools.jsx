import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import CopyAbsoluteUserShapeButton from "./CopyAbsoluteUserShapeButton";
import CopyRelativeUserShapeButton from "./CopyRelativeUserShapeButton";
import CopyVariantIdButton from "./CopyVariantIdButton";
import { Container, DevToolsTitle } from "./parts";

const DevTools = ({ userShape, handleClearUserShape }) => {
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
      <DevToolsTitle>DevTools (Visible)</DevToolsTitle>
      <Container>
        <CopyAbsoluteUserShapeButton
          userShape={userShape}
          handleClearUserShape={handleClearUserShape}
        />
        <CopyRelativeUserShapeButton
          userShape={userShape}
          handleClearUserShape={handleClearUserShape}
        />
        <CopyVariantIdButton />
      </Container>
    </>
  );
};

export default DevTools;

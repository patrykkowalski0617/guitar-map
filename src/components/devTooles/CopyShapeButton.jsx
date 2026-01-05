import { useState } from "react";
import { Button } from "../../parts";

const CopyShapeButton = ({
  devModeShape,
  handleClearDevModeShape,
  label,
  transform,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!devModeShape || devModeShape.length === 0) return;

    const dataToCopy = transform ? transform(devModeShape) : devModeShape;

    const formattedOutput = dataToCopy
      .map((point) => `  ${JSON.stringify(point)}`)
      .join(",\n");

    try {
      await navigator.clipboard.writeText(formattedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      handleClearDevModeShape();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return <Button onClick={handleCopy}>{copied ? "Copied!" : label}</Button>;
};

export default CopyShapeButton;

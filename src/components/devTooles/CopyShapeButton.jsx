import { useState } from "react";
import { StyledButton } from "./parts";

const CopyShapeButton = ({
  userShape,
  handleClearUserShape,
  label,
  transform,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!userShape || userShape.length === 0) return;

    const dataToCopy = transform ? transform(userShape) : userShape;
    const formattedArray = JSON.stringify(dataToCopy, null, 2);

    try {
      await navigator.clipboard.writeText(formattedArray);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error:", err);
    }
    handleClearUserShape();
  };

  return (
    <StyledButton onClick={handleCopy}>
      {copied ? "Copied!" : label}
    </StyledButton>
  );
};

export default CopyShapeButton;

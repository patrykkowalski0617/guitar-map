import { useState } from "react";
import { StyledButton } from "./parts";
import { absoluteToRelative } from "./absoluteToRelative";

const CopyRelativeUserShapeButton = ({ userShape, handleClearUserShape }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!userShape || userShape.length === 0) return;

    const formattedArray = JSON.stringify(
      absoluteToRelative(userShape),
      null,
      2
    );

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
      {copied ? "Copied!" : "Copy Relative User Shape"}
    </StyledButton>
  );
};

export default CopyRelativeUserShapeButton;

import { useState } from "react";
import { StyledButton } from "./parts";

const CopyUserShapeButton = ({ userShape, handleClearUserShape }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!userShape || userShape.length === 0) return;

    const formattedArray = JSON.stringify(userShape, null, 2);

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
      {copied ? "Copied!" : "Copie user shape as JS Array"}
    </StyledButton>
  );
};

export default CopyUserShapeButton;

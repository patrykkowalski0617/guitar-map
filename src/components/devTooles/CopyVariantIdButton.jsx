import { useStore } from "../../store/useStore";
import { useState } from "react";
import { StyledButton } from "./parts";

const CopyVariantIdButton = () => {
  const [copied, setCopied] = useState(false);
  const variantId = useStore((state) => state.variantState.variantId);

  const handleCopy = async () => {
    if (!variantId) return;

    try {
      await navigator.clipboard.writeText(`,"${variantId}"`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <StyledButton onClick={handleCopy} disabled={!variantId}>
      {copied ? "Copied!" : `Copy ID: ${variantId || "None"}`}
    </StyledButton>
  );
};

export default CopyVariantIdButton;

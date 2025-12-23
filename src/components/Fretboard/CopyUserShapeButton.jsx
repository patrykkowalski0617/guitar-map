import { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: #64748b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.2s;
  display: block;
  margin: 10px auto;

  &:hover {
    background-color: #475569;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CopyUserShapeButton = ({ userShape }) => {
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
  };

  return (
    <StyledButton onClick={handleCopy}>
      {copied ? "Copied!" : "Copie user shape as JS Array"}
    </StyledButton>
  );
};

export default CopyUserShapeButton;

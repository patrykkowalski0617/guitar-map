import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 20px 0;
`;

export const Label = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; // Pozwala na zawijanie przy wielu skalach
  gap: 4px;
  background-color: #f1f5f9;
  padding: 4px;
  border-radius: 8px;
  width: fit-content;
`;

export const OptionButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: ${(props) => (props.$active ? "#ffffff" : "transparent")};
  color: ${(props) => (props.$active ? "#0f172a" : "#64748b")};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$active ? "0 1px 3px rgba(0,0,0,0.1)" : "none"};

  &:hover {
    color: #0f172a;
    background: ${(props) =>
      props.$active ? "#ffffff" : "rgba(255, 255, 255, 0.5)"};
  }

  &:active {
    transform: translateY(1px);
  }
`;

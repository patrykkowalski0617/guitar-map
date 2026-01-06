import styled from "styled-components";
import { useVaultStore } from "./useVaultStore";

const KeyInput = styled.input`
  display: block;
  height: 32px;
  width: 100%;
  background: ${(props) => props.theme.colors.bg};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  color: ${(props) => props.theme.colors.text};
  outline: none;
  padding: 0 8px;
`;

const SecureVault = () => {
  const { pass, setPass } = useVaultStore();

  return (
    <KeyInput
      type="password"
      placeholder="key"
      value={pass}
      onChange={(e) => setPass(e.target.value)}
    />
  );
};

export default SecureVault;

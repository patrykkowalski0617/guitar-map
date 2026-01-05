import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  width: 120px;
  background: ${(props) => props.theme.colors.bgLight}dd;
  box-shadow: ${(props) => props.theme.shadows.panel};
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: fixed;
  bottom: 10px;
  right: 35px;
`;

const KeyInput = styled.input`
  width: 100%;
  padding: 5px;
  background: ${(props) => props.theme.colors.bg};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.7rem;
  outline: none;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 8px 2px;
  background: ${(props) => props.theme.colors.contrast};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.7rem;
  &:hover {
    opacity: 0.8;
  }
`;

// TUTAJ WKLEJ TO CO WYPLUŁA KONSOLA Z KROKU 1
const ENCRYPTED_DATA = [
  /* ... twoje 100 zaszyfrowanych stringów ... */
];

const SecureVault = () => {
  const [pass, setPass] = useState(localStorage.getItem("vault_pass") || "");

  const decode = (encoded, key) => {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const keyBytes = new TextEncoder().encode(key);
    const result = bytes.map((b, i) => b ^ keyBytes[i % keyBytes.length]);
    return new TextDecoder().decode(result);
  };

  const handleLogRandom = () => {
    if (!pass || ENCRYPTED_DATA.length === 0)
      return console.warn("Brak hasła lub danych!");
    try {
      const randomEnc =
        ENCRYPTED_DATA[Math.floor(Math.random() * ENCRYPTED_DATA.length)];
      console.log("🔓 Sentencja dnia:", decode(randomEnc, pass));
    } catch (e) {
      console.error("❌ Błędne hasło!");
    }
  };

  return (
    <Container>
      <KeyInput
        type="password"
        placeholder="Klucz"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
          localStorage.setItem("vault_pass", e.target.value);
        }}
      />
      <ActionButton onClick={handleLogRandom}>Losuj</ActionButton>
    </Container>
  );
};

export default SecureVault;

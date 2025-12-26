import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.bg};
  justify-content: center;
`;

export const FunctionItem = styled.span`
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: ${({ theme }) => theme.transitions.default};
  cursor: default;

  /* Kolorowanie zależne od aktywności */
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow : theme.colors.text};

  /* Podkreślenie pasujące do grubości borderów w systemie */
  border-bottom: 2px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.colors.yellow : "transparent"};

  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.2)};
  transform: scale(${({ $isActive }) => ($isActive ? 1.05 : 1)});

  /* Glow dla aktywnej funkcji harmonicznej */
  text-shadow: ${({ $isActive, theme }) =>
    $isActive ? `0 0 10px ${theme.colors.yellow}44` : "none"};
`;

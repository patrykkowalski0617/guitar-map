import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
    color-scheme: light dark;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 18px;
    }

  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts?.main || "sans-serif"};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;

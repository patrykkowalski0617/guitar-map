export const theme = {
  colors: {
    bg: "#121212",
    bgLight: "#2b2b2bff",
    text: "#e2e2e2",
    yellow: "#ffb703",
    blue: "#4a90e2",
    violet: "#9d4edd",
    red: "#e63946",
    green: "#2a9d8f",
    // Dodaję półprzezroczyste warianty (przydatne do legendy/tła)
    overlay: "rgba(0, 0, 0, 0.5)",
    border: "#ffffff1a", // delikatna linia 10% białego
  },

  // Stałe wymiary dla elementów UI (przyciski, inputy, kropki)
  sizes: {
    controls: "32px", // standardowa wysokość przycisku/inputu
    controlsSm: "24px", // mniejsze przyciski pomocnicze
    dot: "20px", // Twoje kostki w visualizerze
    fretboardHeight: "35px", // wysokość struny na gryfie
  },

  // Promienie zaokrągleń
  borderRadius: {
    sm: "4px", // ostre, techniczne (np. Twoje kostki ToneDot)
    md: "8px", // standardowe kontenery
    lg: "12px", // główne panele (np. VisualizerContainer)
    full: "500px", // idealne koło (np. nuty na gryfie)
  },

  // Dodatkowe zmienne, które ułatwią pracę
  shadows: {
    glow: "0 0 12px", // baza pod box-shadow (dodasz tylko kolor)
    panel: "0 4px 20px rgba(0, 0, 0, 0.4)",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "32px",
    xl: "64px",
  },

  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "1024px",
  },

  // Szybki dostęp do przejść tonalnych
  transitions: {
    default: "all 0.3s ease",
    bounce: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
};

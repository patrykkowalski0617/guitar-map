import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const FaderContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Maska pojawia się tylko, gdy lista jest skrolowalna */
  ${({ $isScrollable }) =>
    $isScrollable &&
    css`
      mask-image: linear-gradient(
        to right,
        transparent,
        black 40px,
        black calc(100% - 40px),
        transparent
      );
      -webkit-mask-image: linear-gradient(
        to right,
        transparent,
        black 40px,
        black calc(100% - 40px),
        transparent
      );
    `}
`;

const ScrollContent = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  margin: 0 auto;
  min-width: 100%;

  /* Pseudo-elementy mają teraz stały flex-basis */
  /* Dzięki temu margines jest identyczny dla każdej listy w aplikacji */
  &::before,
  &::after {
    content: "";
    flex: 0 0 20px;
  }
`;

const ScrollFader = ({ children, activeValue }) => {
  const containerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      // Porównujemy szerokość treści z szerokością kontenera
      setIsScrollable(scrollWidth > clientWidth + 2);
    }
  };

  useEffect(() => {
    // Mały delay pomaga, gdy style styled-components jeszcze się ładują
    const timer = setTimeout(checkScroll, 0);
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [children]);

  useEffect(() => {
    const activeElement = containerRef.current?.querySelector(
      '[data-active="true"]'
    );
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeValue]);

  return (
    <FaderContainer ref={containerRef} $isScrollable={isScrollable}>
      <ScrollContent>{children}</ScrollContent>
    </FaderContainer>
  );
};

export default ScrollFader;

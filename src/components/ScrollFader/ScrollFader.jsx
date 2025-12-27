import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const FaderContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Maska (cień) - włącza się TYLKO gdy treść faktycznie wystaje */
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

  /* Centrowanie działa zawsze, ale przy długich listach 
     width: max-content i tak wymusi start od lewej */
  justify-content: center;

  /* Te pseudo-elementy są teraz STAŁE. 
     Gwarantują, że każda lista ma ten sam "bezpieczny" odstęp od krawędzi (20px) */
  &::before,
  &::after {
    content: "";
    flex: 0 0 20px;
    display: block;
  }
`;

const ScrollFader = ({ children, activeValue }) => {
  const containerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      // Sprawdzamy, czy treść (razem ze stałymi gapami) wystaje poza kontener
      setIsScrollable(scrollWidth > clientWidth + 2);
    }
  };

  useEffect(() => {
    const timer = setTimeout(checkScroll, 0);
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [children]);

  useEffect(() => {
    if (isScrollable) {
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
    }
  }, [activeValue, isScrollable]);

  return (
    <FaderContainer ref={containerRef} $isScrollable={isScrollable}>
      <ScrollContent>{children}</ScrollContent>
    </FaderContainer>
  );
};

export default ScrollFader;

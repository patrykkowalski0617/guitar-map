import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const FaderContainer = styled.div`
  overflow-x: auto;
  padding-top: 20px;
  margin-top: -20px;
  padding-bottom: 20px;
  margin-bottom: -20px;
  width: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
    `}
`;

const ScrollContent = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  margin: 0 auto;
  min-width: 100%;

  justify-content: center;
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
      const container = containerRef.current;
      const activeElement = container?.querySelector('[data-active="true"]');

      if (container && activeElement) {
        // Obliczamy pozycję: środek kontenera minus środek elementu
        const elementOffset = activeElement.offsetLeft;
        const elementWidth = activeElement.clientWidth;
        const containerWidth = container.clientWidth;

        const scrollTo = elementOffset - containerWidth / 2 + elementWidth / 2;

        container.scrollTo({
          left: scrollTo,
          behavior: "smooth",
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

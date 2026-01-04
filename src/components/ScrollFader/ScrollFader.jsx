import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const Title = styled.h2`
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.bg};
  line-height: 1;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => `${theme.colors.blue}`};
  white-space: nowrap;
  height: 100%;
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme }) => `${theme.spacing.lg}`};
    margin: 0;
  }
`;

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

  @media (max-width: 768px) {
    margin: 0;
    justify-content: flex-start;
  }

  &::before,
  &::after {
    content: "";
    flex: 0 0 20px;
    display: block;
  }
`;

const ScrollFader = ({ children, activeValue, title }) => {
  const containerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      setIsScrollable(scrollWidth > clientWidth + 2);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (!isScrollable) return;
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isScrollable]);

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
        const containerRect = container.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();

        const elementCenter = elementRect.left + elementRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const diff = elementCenter - containerCenter;

        container.scrollTo({
          left: container.scrollLeft + diff,
          behavior: "smooth",
        });
      }
    }
  }, [activeValue, isScrollable, children]);

  return (
    <MainWrapper>
      {title && <Title>{title}</Title>}
      <FaderContainer ref={containerRef} $isScrollable={isScrollable}>
        <ScrollContent>{children}</ScrollContent>
      </FaderContainer>
    </MainWrapper>
  );
};

export default ScrollFader;

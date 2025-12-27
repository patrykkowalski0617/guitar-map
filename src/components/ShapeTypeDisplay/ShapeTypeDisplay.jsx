import styled from "styled-components";
import { useStore } from "../../store/useStore";
import { setsShapes } from "../../data/setsShapes";

const SelectorContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  padding: 10px 0;
  overflow-x: auto;
`;

const Label = styled.div`
  padding: 6px 12px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : "transparent"};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow : theme.colors.text};
  font-size: 0.8rem;
  white-space: nowrap;
`;

const ShapeTypeDisplay = () => {
  const activeChordId = useStore((state) => state.getActiveChordId());
  const setActiveChordId = useStore((state) => state.setActiveChordId);

  const validSets = setsShapes.filter((set) => set.id && set.label);

  return (
    <SelectorContainer>
      {validSets.map((item) => (
        <Label
          key={item.id}
          $isActive={activeChordId === item.id}
          onClick={() => setActiveChordId(item.id)}
        >
          {item.label}
        </Label>
      ))}
    </SelectorContainer>
  );
};

export default ShapeTypeDisplay;

import { SubsectionTitle } from "../../parts";
import { Container, OptionsWrapper, OptionButton } from "./parts";

const Selector = ({ label, options, value, onChange, isCompact }) => {
  return (
    <Container>
      {label && <SubsectionTitle>{label}</SubsectionTitle>}
      <OptionsWrapper $isCompact={isCompact}>
        {options.map((option) => {
          return (
            <OptionButton
              key={option}
              $active={value === option}
              onClick={() => onChange(option)}
            >
              {option}
            </OptionButton>
          );
        })}
      </OptionsWrapper>
    </Container>
  );
};

export default Selector;

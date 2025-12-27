import { SubsectionTitle } from "../../parts";
import ScrollFader from "../ScrollFader/ScrollFader";
import { Container, OptionsWrapper, OptionButton } from "./parts";

const Selector = ({ label, options, value, onChange, isCompact }) => {
  return (
    <Container>
      {label && <SubsectionTitle>{label}</SubsectionTitle>}

      <ScrollFader activeValue={value}>
        <OptionsWrapper $isCompact={isCompact}>
          {options.map((option) => (
            <OptionButton
              key={option}
              $active={value === option}
              data-active={value === option}
              onClick={() => onChange(option)}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsWrapper>
      </ScrollFader>
    </Container>
  );
};

export default Selector;

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
              key={option.value}
              $active={value === option.value}
              data-active={value === option.value}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </OptionButton>
          ))}
        </OptionsWrapper>
      </ScrollFader>
    </Container>
  );
};

export default Selector;

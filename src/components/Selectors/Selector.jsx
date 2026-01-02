import { Button, SubsectionTitle } from "../../parts";
import ScrollFader from "../ScrollFader/ScrollFader";
import { Container, OptionsWrapper } from "./parts";

const Selector = ({ label, options, value, onChange, isCompact }) => {
  return (
    <Container>
      {label && <SubsectionTitle>{label}</SubsectionTitle>}

      <ScrollFader activeValue={value}>
        <OptionsWrapper $isCompact={isCompact}>
          {options.map((option) => (
            <Button
              key={option.value}
              $active={value === option.value}
              data-active={value === option.value}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </OptionsWrapper>
      </ScrollFader>
    </Container>
  );
};

export default Selector;

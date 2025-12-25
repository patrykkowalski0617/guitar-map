import { Container, Label, OptionsWrapper, OptionButton } from "./parts";

const Selector = ({ label, options, value, onChange }) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <OptionsWrapper>
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

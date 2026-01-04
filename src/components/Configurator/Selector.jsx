import { Button } from "../../parts";
import ScrollFader from "../ScrollFader/ScrollFader";
import { Container, OptionsWrapper } from "./parts";

const Selector = ({ options, value, onChange, isCompact, title }) => {
  return (
    <Container>
      <ScrollFader activeValue={value} title={title}>
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

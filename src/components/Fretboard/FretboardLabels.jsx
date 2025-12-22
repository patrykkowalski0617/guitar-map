import { toRoman } from "../../utils/toRoman";
import {
  CAGEDLetter,
  FretCount,
  StringRow,
  FretboardLabelsWrapper,
} from "./parts";

const FretboardLabels = ({ fretCounts, CAGED, handleCAGEDClick }) => {
  return (
    <FretboardLabelsWrapper>
      <StringRow>
        {fretCounts.map((_, fIdx) => {
          const cagedLetter = Object.keys(CAGED).find((key) =>
            CAGED[key].includes(fIdx)
          );

          return (
            <FretCount
              key={`fret-count-${fIdx}`}
              $numOfCells={fretCounts.length}
              onClick={() => handleCAGEDClick(cagedLetter)}
            >
              {cagedLetter ? (
                <CAGEDLetter>{cagedLetter}</CAGEDLetter>
              ) : (
                toRoman(fIdx)
              )}
            </FretCount>
          );
        })}
      </StringRow>
    </FretboardLabelsWrapper>
  );
};

export default FretboardLabels;

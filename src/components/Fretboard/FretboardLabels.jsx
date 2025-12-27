import { toRoman } from "../../utils/toRoman";
import {
  CAGEDLetter,
  FretCount,
  StringRow,
  FretboardLabelsWrapper,
} from "./parts";

const FretboardLabels = ({
  fretCounts,
  CAGED,
  handleCAGED_MouseOver,
  handleCAGED_MouseLeave,
}) => {
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
              onMouseLeave={handleCAGED_MouseLeave}
              onMouseOver={() =>
                cagedLetter ? handleCAGED_MouseOver(cagedLetter) : null
              }
              style={cagedLetter ? { cursor: "pointer" } : null}
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

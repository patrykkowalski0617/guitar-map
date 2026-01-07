import {
  CAGEDLetter,
  FretCount,
  StringRow,
  FretboardLabelsWrapper,
} from "./parts";

const InteractiveCAGEDLetter = ({
  letter,
  isLocked,
  onClick,
  onOver,
  onLeave,
}) => (
  <CAGEDLetter
    $isCAGED_hoverShapeLocked={isLocked}
    onClick={(e) => {
      e.stopPropagation();
      onClick?.(letter);
    }}
    onMouseEnter={() => onOver?.(letter)}
    onMouseLeave={() => onLeave?.()}
  >
    {letter}
  </CAGEDLetter>
);

const FretboardLabels = ({
  fretCounts,
  CAGED,
  handleCAGED_MouseOver,
  handleCAGED_MouseLeave,
  handleCAGED_Click,
  lockedCAGEDLetter,
}) => {
  return (
    <FretboardLabelsWrapper>
      <StringRow>
        {fretCounts.map((_, fIdx) => {
          const cagedLetter = Object.keys(CAGED).find((key) =>
            CAGED[key].includes(fIdx)
          );
          const isOneDot = [3, 5, 7, 9, 15, 17, 19, 21].includes(fIdx);
          const isTwoDots = [12, 24].includes(fIdx);

          return (
            <FretCount
              key={`fret-count-${fIdx}`}
              $numOfCells={fretCounts.length}
              $dotType={isTwoDots ? "double" : isOneDot ? "single" : "none"}
            >
              <InteractiveCAGEDLetter
                letter={cagedLetter}
                isLocked={lockedCAGEDLetter === cagedLetter}
                onClick={handleCAGED_Click}
                onOver={handleCAGED_MouseOver}
                onLeave={handleCAGED_MouseLeave}
              />
            </FretCount>
          );
        })}
      </StringRow>
    </FretboardLabelsWrapper>
  );
};

export default FretboardLabels;

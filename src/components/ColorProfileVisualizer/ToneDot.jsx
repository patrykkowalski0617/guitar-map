import * as S from "./parts";

const ToneDot = ({
  interval,
  profile,
  legendRender,
  isRowActive,
  noteName,
  engine,
}) => {
  const { playNote, stopNote } = engine || {};

  if (!engine && !legendRender) {
    console.warn(`Missing engine for ToneDot at interval: ${interval}`);
  }

  const isExposed = profile?.exposedTone === interval;
  const isUsed = profile?.usedTones?.includes(interval);
  const isAvoid = profile?.avoidNotes?.includes(interval);
  const isAltered = profile?.alteredTones?.includes(interval);

  let offset = 0;
  if (isExposed) offset = -35;
  else if (isUsed || isAltered) offset = -18;
  const isRaised = offset !== 0;

  const handleMouseEnter = () => {
    if (isRowActive && isRaised && noteName && playNote) {
      playNote(noteName, 4, false);
    }
  };

  const handleMouseLeave = () => {
    if (isRowActive && isRaised && noteName && stopNote) {
      stopNote(noteName, 4, false);
    }
  };

  return (
    <S.DotStack onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <S.ToneDot
        $interval={interval}
        $offset={offset}
        $isExposed={isExposed}
        $isRaised={isRaised}
        $isAvoid={isAvoid}
        $isAltered={isAltered}
        $legendRender={legendRender}
      />
      {!legendRender && (
        <S.IntervalNumber
          $interval={interval}
          $isRaised={isRaised}
          $isAvoid={isAvoid}
          $isAltered={isAltered}
        >
          {interval}
        </S.IntervalNumber>
      )}
    </S.DotStack>
  );
};

export default ToneDot;

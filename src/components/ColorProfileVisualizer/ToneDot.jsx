import * as S from "./parts";

const ToneDot = ({ interval, profile, legendRender, isActive }) => {
  const isExposed = profile?.exposedTone === interval;
  const isUsed = profile?.usedTones?.includes(interval);
  const isAvoid = profile?.avoidNotes?.includes(interval);
  const isAltered = profile?.alteredTones?.includes(interval);

  let offset = 0;
  if (isExposed) offset = -35;
  else if (isUsed || isAltered) offset = -18;
  const isRaised = offset !== 0;

  return (
    <S.DotStack>
      <S.ToneDot
        $interval={interval}
        $offset={offset}
        $isExposed={isExposed}
        $isRaised={isRaised}
        $isAvoid={isAvoid}
        $isAltered={isAltered}
        $legendRender={legendRender}
        $isPlaying={isActive}
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

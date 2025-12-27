import { UnderLabel } from "../../parts";
import * as S from "./parts";

const INTERVALS = [1, 3, 5, 7, 9, 11, 13];

const ProfileRow = ({ label, profile, rootNoteName }) => {
  return (
    <S.ProfileColumn>
      <S.DotsWrapper>
        {INTERVALS.map((interval) => {
          const isExposed = profile?.exposedTone === interval;
          const isUsed = profile?.usedTones?.includes(interval);
          const isAvoid = profile?.avoidNotes?.includes(interval);
          const isActive = isExposed || isUsed || isAvoid;

          // Logika przesunięcia w pionie (animacja wejścia)
          let offset = 0;
          if (isExposed) offset = -35;
          else if (isUsed || isAvoid) offset = -18;

          return (
            <S.DotStack key={interval}>
              <S.ToneDot
                $interval={interval}
                $offset={offset}
                $isExposed={isExposed}
                $isActive={isActive}
                $isAvoid={isAvoid}
                title={isAvoid ? `Avoid: ${interval}` : `Interval: ${interval}`}
              />
              <S.IntervalNumber
                $interval={interval}
                $isActive={isActive}
                $isAvoid={isAvoid}
              >
                {interval}
              </S.IntervalNumber>
            </S.DotStack>
          );
        })}
      </S.DotsWrapper>
      <UnderLabel>
        <strong>{rootNoteName}</strong> {label}
      </UnderLabel>
    </S.ProfileColumn>
  );
};

export default ProfileRow;

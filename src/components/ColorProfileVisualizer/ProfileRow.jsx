import * as S from "./parts";
import ToneDot from "./ToneDot";
import { Button } from "../../parts";

const INTERVALS = [1, 3, 5, 7, 9, 11, 13];

const ProfileRow = ({
  label,
  profile,
  isRowActive,
  activeInterval,
  activeShapeName,
  shapeNotes = [],
  engine,
  onToggle,
}) => {
  const raisedIntervals = INTERVALS.filter((interval) => {
    return (
      // Sprawdzamy exposedTone (zakładam, że to prosta liczba)
      profile?.exposedTone === interval ||
      // Szukamy w tablicy tablic usedTones
      profile?.usedTones?.some((t) => t[0] === interval) ||
      // Szukamy w tablicy tablic alteredTones (jeśli mają tę samą strukturę)
      profile?.alteredTones?.some((t) => t[0] === interval)
    );
  });

  return (
    <>
      <S.ProfileColumn>
        <S.DotsWrapper>
          {INTERVALS.map((interval) => {
            const raisedIndex = raisedIntervals.indexOf(interval);
            const noteToAssign =
              raisedIndex !== -1 ? shapeNotes[raisedIndex] : null;
            return (
              <ToneDot
                key={interval}
                interval={interval}
                profile={profile}
                noteName={noteToAssign}
                isRowActive={isRowActive}
                isActive={activeInterval === interval}
                engine={engine}
              />
            );
          })}
        </S.DotsWrapper>
      </S.ProfileColumn>

      <Button $active={isRowActive} onClick={onToggle}>
        {isRowActive ? (
          "Stop"
        ) : (
          <>
            Play&nbsp;<span>{activeShapeName}&nbsp;Set&nbsp;</span> over&nbsp;
            <span>{label}</span>
          </>
        )}
      </Button>
    </>
  );
};

export default ProfileRow;

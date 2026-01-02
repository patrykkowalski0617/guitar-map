import * as S from "./parts";
import ToneDot from "./ToneDot";

const INTERVALS = [1, 3, 5, 7, 9, 11, 13];

const ProfileRow = ({
  label,
  profile,
  isRowActive,
  activeShapeName,
  shapeNotes = [],
  engine,
}) => {
  const raisedIntervals = INTERVALS.filter((interval) => {
    return (
      profile?.exposedTone === interval ||
      profile?.usedTones?.includes(interval) ||
      profile?.alteredTones?.includes(interval)
    );
  });

  return (
    <S.ProfileColumn>
      <S.VisLabel>
        <span>{activeShapeName}</span> over <span>{label}</span>
      </S.VisLabel>
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
              engine={engine}
            />
          );
        })}
      </S.DotsWrapper>
    </S.ProfileColumn>
  );
};

export default ProfileRow;

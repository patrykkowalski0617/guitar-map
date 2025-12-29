import { UnderLabel } from "../../parts";
import * as S from "./parts";
import ToneDot from "./ToneDot";

const INTERVALS = [1, 3, 5, 7, 9, 11, 13];

const ProfileRow = ({ label, profile, rootNoteName }) => {
  return (
    <S.ProfileColumn>
      <UnderLabel>
        {rootNoteName} {label}
      </UnderLabel>
      <S.DotsWrapper>
        {INTERVALS.map((interval) => (
          <ToneDot key={interval} interval={interval} profile={profile} />
        ))}
      </S.DotsWrapper>
    </S.ProfileColumn>
  );
};

export default ProfileRow;

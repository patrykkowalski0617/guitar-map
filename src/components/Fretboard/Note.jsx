import { useMusicStore } from "../../store/useMusicStore";
import * as S from "./parts";

const Note = ({ stringId, fretId, note }) => {
  const { string, setString, fret, setFret } = useMusicStore();

  const handleClick = () => {
    setString(stringId);
    setFret(fretId);
  };

  const isSelected = string === stringId && fret === fretId;

  return (
    <S.Note $isRootNote={isSelected} onClick={handleClick}>
      {note}
    </S.Note>
  );
};

export default Note;

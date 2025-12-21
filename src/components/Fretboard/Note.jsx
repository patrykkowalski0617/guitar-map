import { useMusicStore } from "../../store/useMusicStore";
import * as S from "./parts";
const Note = ({ stringId, fretId, note }) => {
  const { setString, setFret } = useMusicStore();
  const handleClick = () => {
    setString(stringId);
    setFret(fretId);
  };
  return <S.Note onClick={handleClick}>{note}</S.Note>;
};

export default Note;

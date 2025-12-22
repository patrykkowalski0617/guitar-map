import { useMusicStore } from "../../store/useMusicStore";
import * as S from "./parts";

const Note = ({ stringId, fretId, note, $isInSet, $activeMarkerNote }) => {
  const { string, setString, fret, setFret } = useMusicStore();

  const handleClick = () => {
    setString(stringId);
    setFret(fretId);
  };

  return (
    <S.Note
      $isInSet={$isInSet}
      $activeMarkerNote={$activeMarkerNote}
      onClick={handleClick}
    >
      {note}
    </S.Note>
  );
};

export default Note;

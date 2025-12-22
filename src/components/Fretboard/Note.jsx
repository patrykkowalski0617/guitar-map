import * as S from "./parts";

const Note = ({
  handleClick,
  note,
  $isInSet,
  $activeMarkerNote,
  CAGED_noteId,
  $isSelected,
}) => {
  return (
    <S.Note
      $isInSet={$isInSet}
      $activeMarkerNote={$activeMarkerNote}
      onClick={handleClick}
      $isSelected={$isSelected}
      className={`CAGED_noteId__${CAGED_noteId}`}
    >
      {note}
    </S.Note>
  );
};

export default Note;

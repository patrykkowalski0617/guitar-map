import * as S from "./parts";

const Note = ({
  handleClick,
  note,
  $isInSet,
  $activeMarkerNote,
  CAGED_noteId,
  $isSelected,
  isCAGEDShapeType,
}) => {
  return (
    <S.Note
      $isInSet={$isInSet}
      $activeMarkerNote={$activeMarkerNote}
      onClick={handleClick}
      $isSelected={$isSelected}
      className={`CAGED_noteId__${CAGED_noteId}`}
      $isCAGEDShapeType={isCAGEDShapeType}
    >
      {note}
    </S.Note>
  );
};

export default Note;

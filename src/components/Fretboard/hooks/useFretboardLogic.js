import { transposeShape } from "../../../utils";
import { CAGED_shapes } from "../../../data";

export const useFretboardLogic = (props) => {
  const {
    activeShapeRootNote,
    activeChordVariants,
    variantState,
    setVariantState,
    setShape,
    setDevModeShape,
    setLockedCAGEDLetter,
    lockedCAGEDLetter,
  } = props;

  const detectCAGEDLetter = (shapeIds) => {
    if (!shapeIds || shapeIds.length === 0) return null;

    const letters = ["C", "B", "A", "G", "F", "E", "D"];

    for (const letter of letters) {
      const pattern = CAGED_shapes[letter] || [];
      const matches = shapeIds.every((id) => pattern.includes(id));
      if (matches) return letter;
    }
    return null;
  };

  const handleNoteClick = (note, CAGED_noteId) => {
    if (setDevModeShape) {
      setDevModeShape((prev) =>
        prev.includes(CAGED_noteId)
          ? prev.filter((id) => id !== CAGED_noteId)
          : [...prev, CAGED_noteId]
      );
      if (activeShapeRootNote !== note) return;
    }

    if (activeShapeRootNote !== note || activeChordVariants.length === 0)
      return;

    const stringId = CAGED_noteId.split("_")[0];
    const totalVariantsCount = activeChordVariants.length;
    const isNewNote = variantState.lastId !== CAGED_noteId;

    let foundVariant = null;

    if (isNewNote && lockedCAGEDLetter) {
      foundVariant = activeChordVariants.find(
        (v) =>
          v.targetString === stringId &&
          detectCAGEDLetter(transposeShape(v.shape, CAGED_noteId)) ===
            lockedCAGEDLetter
      );
    }

    if (!foundVariant) {
      const currentIdx = activeChordVariants.findIndex(
        (v) => v.id === variantState.variantId
      );

      let nextIdx =
        isNewNote || variantState.variantId === "SUM" ? 0 : currentIdx + 1;
      let attempts = 0;

      while (attempts < totalVariantsCount && nextIdx < totalVariantsCount) {
        const candidate = activeChordVariants[nextIdx];
        if (candidate.targetString === stringId) {
          foundVariant = candidate;
          break;
        }
        nextIdx++;
        attempts++;
      }
    }

    if (foundVariant) {
      const newShape = transposeShape(foundVariant.shape, CAGED_noteId);

      if (setLockedCAGEDLetter) {
        const detectedLetter = detectCAGEDLetter(newShape);
        setLockedCAGEDLetter(detectedLetter);
      }

      setShape(newShape);
      setVariantState({
        lastId: CAGED_noteId,
        variantId: foundVariant.id,
      });
    } else {
      if (setLockedCAGEDLetter) setLockedCAGEDLetter(null);
      setShape([]);
      setVariantState({ lastId: CAGED_noteId, variantId: null });
    }
  };

  return { handleNoteClick };
};

export default useFretboardLogic;

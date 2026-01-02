import { transposeShape } from "../../../utils";
import { CAGED_shapes } from "../../../data";

export const useFretboardLogic = (props) => {
  const {
    activeShapeRootNote,
    activeChordVariants,
    variantState,
    setVariantState,
    setShape,
    activeRootIds,
    isDevMode,
    setUserShape,
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
    if (isDevMode && setUserShape) {
      setUserShape((prev) =>
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
      return;
    }

    if (setLockedCAGEDLetter) setLockedCAGEDLetter(null);

    const combinedShapeSet = new Set();
    activeRootIds.forEach((rootId) => {
      const rStringId = rootId.split("_")[0];
      const validVariants = activeChordVariants.filter(
        (v) => v.targetString === rStringId
      );

      validVariants.forEach((v) => {
        const t = transposeShape(v.shape, rootId);
        t.forEach((id) => combinedShapeSet.add(id));
      });
    });

    setShape(Array.from(combinedShapeSet));
    setVariantState({ lastId: CAGED_noteId, variantId: "SUM" });
  };

  return { handleNoteClick };
};

export default useFretboardLogic;

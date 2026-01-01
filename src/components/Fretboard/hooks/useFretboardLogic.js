import { transposeShape } from "../../../utils";

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
  } = props;

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

    const currentIdx = activeChordVariants.findIndex(
      (v) => v.id === variantState.variantId
    );

    let nextIdx =
      variantState.lastId !== CAGED_noteId || variantState.variantId === "SUM"
        ? 0
        : currentIdx + 1;

    let foundVariant = null;
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

    if (foundVariant) {
      if (foundVariant.targetCAGED && setLockedCAGEDLetter) {
        setLockedCAGEDLetter(foundVariant.targetCAGED);
      }

      setShape(transposeShape(foundVariant.shape, CAGED_noteId));
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

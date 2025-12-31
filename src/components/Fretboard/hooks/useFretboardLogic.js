import { transposeShape } from "../../../utils";

export const useFretboardLogic = (props) => {
  const {
    activeShapeRootNote,
    activeChordVariants,
    CAGED_hoverShape,
    variantState,
    setVariantState,
    setShape,
    activeRootIds,
    isDevMode,
    setUserShape,
  } = props;

  const checkAvailability = (variant, CAGED_noteId) => {
    const stringId = CAGED_noteId.split("_")[0];
    const isAllowed = !variant.notAllowedOnStrings?.includes(stringId);
    const transposed = isAllowed
      ? transposeShape(variant.shape, CAGED_noteId)
      : [];
    return (
      transposed.length > 0 &&
      (CAGED_hoverShape.length === 0 ||
        transposed.every((id) => CAGED_hoverShape.includes(id)))
    );
  };

  const handleNoteClick = (note, CAGED_noteId) => {
    // Dev Mode
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

    const totalVariantsCount = activeChordVariants.length;
    let nextVariantIdx;

    const currentIdx = activeChordVariants.findIndex(
      (v) => v.id === variantState.variantId
    );

    if (
      variantState.lastId !== CAGED_noteId ||
      variantState.variantId === "SUM"
    ) {
      nextVariantIdx = 0;
    } else {
      nextVariantIdx = currentIdx + 1;
    }

    // ALL
    if (nextVariantIdx >= totalVariantsCount) {
      const combinedShapeSet = new Set();
      activeRootIds.forEach((rootId) => {
        const rStringId = rootId.split("_")[0];
        const validVariant = activeChordVariants.find((v) => {
          if (v.notAllowedOnStrings?.includes(rStringId)) return false;
          const t = transposeShape(v.shape, rootId);
          return (
            t.length > 0 &&
            (CAGED_hoverShape.length === 0 ||
              t.every((id) => CAGED_hoverShape.includes(id)))
          );
        });
        if (validVariant)
          transposeShape(validVariant.shape, rootId).forEach((id) =>
            combinedShapeSet.add(id)
          );
      });

      setShape(Array.from(combinedShapeSet));
      setVariantState({
        lastId: CAGED_noteId,
        variantId: "SUM",
        label: "All",
        isError: false,
      });
      return;
    }

    const nextVariant = activeChordVariants[nextVariantIdx];
    const isAvailable = checkAvailability(nextVariant, CAGED_noteId);
    const label = `${nextVariantIdx + 1}/${totalVariantsCount}`;

    if (isAvailable) {
      setShape(transposeShape(nextVariant.shape, CAGED_noteId));
      setVariantState({
        lastId: CAGED_noteId,
        variantId: nextVariant.id,
        label,
        isError: false,
      });
    } else {
      setVariantState({
        ...variantState,
        lastId: CAGED_noteId,
        variantId: nextVariant.id,
        label,
        isError: true,
      });
    }
  };

  return { handleNoteClick };
};

export default useFretboardLogic;

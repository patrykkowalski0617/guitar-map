import { transposeShape } from "../../../utils";

const useFretboardLogic = (props) => {
  const {
    activeShapeRootNote,
    activeChordVariants,
    CAGED_shift,
    CAGED_hoverShape,
    variantState,
    setVariantState,
    setShape,
    activeRootIds,
  } = props;

  const handleNoteClick = (note, CAGED_noteId) => {
    if (activeShapeRootNote !== note || activeChordVariants.length === 0)
      return;

    const stringId = CAGED_noteId.split("_")[0];

    // 1. Znajdź dostępne indeksy
    const availableIndices = activeChordVariants
      .map((v, idx) => {
        const isAllowed = !v.notAllowedOnStrings?.includes(stringId);
        const transposed = isAllowed
          ? transposeShape(v.shape, CAGED_noteId)
          : [];
        const matchesCAGED =
          transposed.length > 0 &&
          (CAGED_hoverShape.length === 0 ||
            transposed.every((id) => CAGED_hoverShape.includes(id)));
        return matchesCAGED ? idx : null;
      })
      .filter((idx) => idx !== null);

    // 2. Logika wyboru akcji (Wariant vs SUM)
    let nextAction = "SUM";
    if (variantState.lastId !== CAGED_noteId) {
      nextAction = availableIndices.length > 0 ? availableIndices[0] : "SUM";
    } else {
      const currentInAvailableIdx = availableIndices.indexOf(
        variantState.index
      );
      if (
        currentInAvailableIdx !== -1 &&
        currentInAvailableIdx < availableIndices.length - 1
      ) {
        nextAction = availableIndices[currentInAvailableIdx + 1];
      } else if (variantState.index === "SUM") {
        nextAction = availableIndices.length > 0 ? availableIndices[0] : "SUM";
      }
    }

    // 3. Wykonanie akcji
    if (nextAction === "SUM") {
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
      setVariantState({ lastId: CAGED_noteId, index: "SUM" });
    } else {
      const variant = activeChordVariants[nextAction];
      setShape(transposeShape(variant.shape, CAGED_noteId));
      setVariantState({ lastId: CAGED_noteId, index: nextAction });
    }
  };

  return { handleNoteClick };
};

export default useFretboardLogic;

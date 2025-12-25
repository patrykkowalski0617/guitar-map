import React, { useEffect } from "react";
import Selector from "./Selector";
import { musicFunctionContextSelectorData } from "../../data/data";
import { useStore } from "../../store/useStore";

const FunctionContextSelector = () => {
  const {
    activeMusicContext,
    setActiveMusicContextByName,
    activeShape,
    setActiveShape,
    setActiveShapeByName,
    getKeyNotes,
  } = useStore();

  const keyNotes = getKeyNotes();

  // Helper do renderowania nazwy konkretnego kształtu
  const renderShapeName = (shape) => {
    if (!shape) return "";
    // Jeśli zdefiniowano rootSemitone, przekaż odpowiednią nutę z tablicy
    const rootNote =
      shape.rootSemitone !== undefined
        ? keyNotes[shape.rootSemitone]
        : undefined;
    return shape.getNotesSetName(rootNote);
  };

  // Opcje dla kontekstów
  const contextOptions = musicFunctionContextSelectorData.map(
    (item) => item.FunctionContextName
  );

  // Opcje dla kształtów - teraz przekazujemy tylko pojedynczą nutę do funkcji
  const shapeOptions =
    activeMusicContext?.shapes?.map((shape) => renderShapeName(shape)) || [];

  useEffect(() => {
    if (activeMusicContext?.shapes?.length > 0) {
      const isStillValid = activeMusicContext.shapes.some(
        (s) => s === activeShape
      );
      if (!isStillValid) {
        setActiveShape(activeMusicContext.shapes[0]);
      }
    }
  }, [activeMusicContext, activeShape, setActiveShape]);

  return (
    <>
      <Selector
        label="Context - Unified Functions"
        options={contextOptions}
        value={activeMusicContext?.FunctionContextName}
        onChange={setActiveMusicContextByName}
      />
      tutaj opis: realese, tension...
      {shapeOptions.length > 0 && (
        <Selector
          label="Set of notes - chords, scales, other kind of sets"
          options={shapeOptions}
          // Tutaj również używamy helpera, aby wyświetlić poprawną nazwę aktywnego kształtu
          value={renderShapeName(activeShape)}
          onChange={setActiveShapeByName}
        />
      )}
      tutaj opis: upper structor...
      <br />
      jakie kolory są podkreślane
    </>
  );
};

export default FunctionContextSelector;

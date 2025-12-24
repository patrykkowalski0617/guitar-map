import React, { useEffect } from "react";
import SegmentedSelect from "./SegmentedSelect";
import { musicFunctionContextSelectorData } from "../../data/shapes";
import { useMusicStore } from "../../store/useMusicStore";

const FunctionContextSelector = () => {
  const {
    activeMusicContext,
    setActiveMusicContextByName, // Ta nazwa musi się zgadzać z tą w onChange
    activeShape,
    setActiveShape,
    setActiveShapeByName,
    getKeyNotes,
  } = useMusicStore();

  const keyNotes = getKeyNotes();

  // Opcje dla kontekstów (Tonics, Subdominants...)
  const contextOptions = musicFunctionContextSelectorData.map(
    (item) => item.FunctionContextName
  );

  // Opcje dla kształtów (zrenderowane nazwy: "C M7" itp.)
  const shapeOptions =
    activeMusicContext?.shapes?.map((shape) =>
      shape.getNotesSetName(keyNotes)
    ) || [];

  // Automatyczny wybór pierwszego kształtu przy zmianie kategorii
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
      <SegmentedSelect
        label="Context"
        options={contextOptions}
        value={activeMusicContext?.FunctionContextName}
        onChange={setActiveMusicContextByName} // Poprawione z setActiveByName
      />

      {shapeOptions.length > 0 && (
        <SegmentedSelect
          label="Shape"
          options={shapeOptions}
          value={activeShape?.getNotesSetName(keyNotes)}
          onChange={setActiveShapeByName}
        />
      )}
    </>
  );
};

export default FunctionContextSelector;

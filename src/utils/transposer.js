import { NOTES_FROM_C } from "../data/music-theory";

const STRING_MAP = {
  E1: "E",
  A2: "A",
  D3: "D",
  G4: "G",
  B5: "B",
  E6: "E",
};

const STRING_ORDER = ["E1", "A2", "D3", "G4", "B5", "E6"];

/**
 * Przesuwa kształt (tablicę punktów) do nowego punktu startowego.
 * @param {Array} initialShape - Tablica np. ["E1_A", "E1_B", ...]
 * @param {String} targetPoint - Punkt docelowy np. "A2_D"
 * @returns {Array} - Nowa tablica przesuniętych punktów
 */
export const transposeShape = (initialShape, targetPoint) => {
  if (!initialShape || initialShape.length === 0 || !targetPoint) return [];

  // 1. Pomocnicza funkcja obliczająca próg
  const getFretValue = (stringName, noteName) => {
    const startNote = STRING_MAP[stringName];
    const startIndex = NOTES_FROM_C.indexOf(startNote);
    const targetIndex = NOTES_FROM_C.indexOf(noteName);
    let fret = targetIndex - startIndex;
    if (fret < 0) fret += 12;
    return fret;
  };

  // 2. Analiza punktu odniesienia (pierwszy element tablicy wejściowej)
  const [originString, originNote] = initialShape[0].split("_");
  const originStringIdx = STRING_ORDER.indexOf(originString);
  const originFret = getFretValue(originString, originNote);

  // 3. Analiza docelowego punktu startowego
  const [tString, tNote] = targetPoint.split("_");
  const tStringIdx = STRING_ORDER.indexOf(tString);
  const tFret = getFretValue(tString, tNote);

  // 4. Obliczanie różnicy (offsetu) między starym a nowym punktem startowym
  const stringDiff = tStringIdx - originStringIdx;
  const fretDiff = tFret - originFret;

  // 5. Przesunięcie wszystkich punktów o wyliczoną różnicę
  return initialShape
    .map((point) => {
      const [s, n] = point.split("_");
      const sIdx = STRING_ORDER.indexOf(s);
      const fVal = getFretValue(s, n);

      const newSIdx = sIdx + stringDiff;
      const newFval = fVal + fretDiff;

      // Zabezpieczenie: jeśli punkt wypada poza gryf (struny)
      if (newSIdx < 0 || newSIdx >= STRING_ORDER.length) return null;

      const newSName = STRING_ORDER[newSIdx];
      const startNoteOfNewString = STRING_MAP[newSName];
      const startNoteIdx = NOTES_FROM_C.indexOf(startNoteOfNewString);

      let finalNoteIdx = (startNoteIdx + newFval) % 12;
      if (finalNoteIdx < 0) finalNoteIdx += 12;

      return `${newSName}_${NOTES_FROM_C[finalNoteIdx]}`;
    })
    .filter((p) => p !== null);
};

/**
 * Porównuje dwa kształty i sprawdza, czy są tą samą strukturą (transpozycją).
 * @param {Array} shapeA - Pierwszy kształt np. ["E1_A", "E1_B"]
 * @param {Array} shapeB - Drugi kształt np. ["A2_D", "A2_E"]
 * @returns {Boolean} - true jeśli to ten sam kształt, false w przeciwnym razie
 */
export const isSameShape = (shapeA, shapeB) => {
  // 1. Podstawowe sprawdzenie długości
  if (!shapeA || !shapeB || shapeA.length !== shapeB.length) return false;
  if (shapeA.length === 0) return true;

  const getFretValue = (stringName, noteName) => {
    const startNote = STRING_MAP[stringName];
    const startIndex = NOTES_FROM_C.indexOf(startNote);
    const targetIndex = NOTES_FROM_C.indexOf(noteName);
    let fret = targetIndex - startIndex;
    if (fret < 0) fret += 12;
    return fret;
  };

  // 2. Funkcja pomocnicza do generowania "odcisku palca" kształtu (wektorów)
  const getShapeVectors = (shape) => {
    const [originString, originNote] = shape[0].split("_");
    const originStringIdx = STRING_ORDER.indexOf(originString);
    const originFret = getFretValue(originString, originNote);

    return shape.map((point) => {
      const [s, n] = point.split("_");
      const sIdx = STRING_ORDER.indexOf(s);
      const fVal = getFretValue(s, n);

      return {
        sDiff: sIdx - originStringIdx,
        fDiff: fVal - originFret,
      };
    });
  };

  // 3. Pobierz wektory dla obu kształtów
  const vectorsA = getShapeVectors(shapeA);
  const vectorsB = getShapeVectors(shapeB);

  // 4. Porównaj każdy wektor (struna po strunie, próg po progu)
  return vectorsA.every(
    (vec, index) =>
      vec.sDiff === vectorsB[index].sDiff && vec.fDiff === vectorsB[index].fDiff
  );
};

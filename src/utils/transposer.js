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

// Odległość każdej struny od najniższego E1 w półtonach
// E1=0, A2=5, D3=10, G4=15, B5=19 (skok o 4!), E6=24
const STRING_OFFSETS = [0, 5, 10, 15, 19, 24];

/**
 * Zwraca numer progu dla danej struny i nuty.
 */
const getFretValue = (stringName, noteName) => {
  const startNote = STRING_MAP[stringName];
  const startIndex = NOTES_FROM_C.indexOf(startNote);
  const targetIndex = NOTES_FROM_C.indexOf(noteName);
  let fret = targetIndex - startIndex;
  if (fret < 0) fret += 12;
  return fret;
};

/**
 * Oblicza absolutną wartość półtonową punktu (np. "E1_A" -> 5)
 */
const getAbsoluteSemitones = (point) => {
  const [sName, nName] = point.split("_");
  const sIdx = STRING_ORDER.indexOf(sName);
  const fret = getFretValue(sName, nName);
  return STRING_OFFSETS[sIdx] + fret;
};

/**
 * Przesuwa kształt do nowego punktu startowego.
 * Wykorzystuje matematykę interwałów, co automatycznie rozwiązuje problem struny B.
 */
export const transposeShape = (initialShape, targetPoint) => {
  if (!initialShape || initialShape.length === 0 || !targetPoint) return [];

  // 1. Obliczamy pozycję i "masę" muzyczną punktu startowego
  const originAbs = getAbsoluteSemitones(initialShape[0]);
  const targetAbs = getAbsoluteSemitones(targetPoint);

  // 2. Ustalamy różnicę strun (ile strun w górę/dół przesuwamy kształt)
  const [originString] = initialShape[0].split("_");
  const [targetString] = targetPoint.split("_");
  const stringDiff =
    STRING_ORDER.indexOf(targetString) - STRING_ORDER.indexOf(originString);

  return initialShape
    .map((point) => {
      const [sName] = point.split("_");
      const currentSIdx = STRING_ORDER.indexOf(sName);

      // Wyliczamy interwał danej nuty względem bazy (np. tercja = 4 półtony)
      const interval = getAbsoluteSemitones(point) - originAbs;

      // Wyliczamy docelową wartość półtonową
      const newAbsValue = targetAbs + interval;

      // Wyliczamy nową strunę (zachowując geometrię kształtu)
      const newSIdx = currentSIdx + stringDiff;

      // Zabezpieczenie przed wyjściem poza gryf
      if (newSIdx < 0 || newSIdx >= STRING_ORDER.length) return null;

      const newSName = STRING_ORDER[newSIdx];

      // Kluczowy moment: wyliczamy próg odejmując offset nowej struny
      // To tutaj automatycznie koryguje się różnica 4 vs 5 półtonów struny B
      const newFret = newAbsValue - STRING_OFFSETS[newSIdx];

      // Jeśli próg jest ujemny (nie da się zagrać tego kształtu w tej pozycji)
      if (newFret < 0) return null;

      // Zamieniamy próg z powrotem na nazwę nuty
      const startNoteOfNewString = STRING_MAP[newSName];
      const startNoteIdx = NOTES_FROM_C.indexOf(startNoteOfNewString);
      let finalNoteIdx = (startNoteIdx + newFret) % 12;
      if (finalNoteIdx < 0) finalNoteIdx += 12;

      return `${newSName}_${NOTES_FROM_C[finalNoteIdx]}`;
    })
    .filter((p) => p !== null);
};

/**
 * Porównuje dwa kształty sprawdzając, czy ich interwały są identyczne.
 */
export const isSameShape = (shapeA, shapeB) => {
  if (!shapeA || !shapeB || shapeA.length !== shapeB.length) return false;
  if (shapeA.length === 0) return true;

  const getShapeStructure = (shape) => {
    const originAbs = getAbsoluteSemitones(shape[0]);
    return shape.map((point) => getAbsoluteSemitones(point) - originAbs);
  };

  const structureA = getShapeStructure(shapeA);
  const structureB = getShapeStructure(shapeB);

  return structureA.every((val, index) => val === structureB[index]);
};

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
const STRING_OFFSETS = [0, 5, 10, 15, 19, 24];

/**
 * Oblicza absolutną wartość półtonową punktu (np. "E1_A" -> 5)
 */
export const getAbsoluteSemitones = (point) => {
  const [sName, nName] = point.split("_");
  const sIdx = STRING_ORDER.indexOf(sName);

  // Wyliczamy próg
  const startNote = STRING_MAP[sName];
  const startIndex = NOTES_FROM_C.indexOf(startNote);
  const targetIndex = NOTES_FROM_C.indexOf(nName);
  let fret = targetIndex - startIndex;
  if (fret < 0) fret += 12;

  return STRING_OFFSETS[sIdx] + fret;
};

/**
 * Renderuje relatywny kształt na konkretny punkt startowy gryfu.
 * @param {Array} relativeShape - Tablica [sDiff, iDiff] np. [[0,0], [0,4], [1,7]]
 * @param {string} targetPoint - Punkt zakotwiczenia np. "A2_C#"
 */
export const transposeShape = (relativeShape, targetPoint) => {
  if (!relativeShape || relativeShape.length === 0 || !targetPoint) return [];

  const targetAbs = getAbsoluteSemitones(targetPoint);
  const [targetStringName] = targetPoint.split("_");
  const targetStringIdx = STRING_ORDER.indexOf(targetStringName);

  return relativeShape
    .map(([sDiff, iDiff]) => {
      // 1. Wyliczamy nową strunę na podstawie relatywnego przesunięcia
      const newSIdx = targetStringIdx + sDiff;
      if (newSIdx < 0 || newSIdx >= STRING_ORDER.length) return null;

      const newSName = STRING_ORDER[newSIdx];

      // 2. Wyliczamy absolutną wartość muzyczną (półtonową)
      const newAbsValue = targetAbs + iDiff;

      // 3. Wyliczamy próg (Absolutna wartość - offset nowej struny)
      const newFret = newAbsValue - STRING_OFFSETS[newSIdx];

      // Jeśli kształt fizycznie nie mieści się na tej strunie w tej pozycji
      if (newFret < 0) return null;

      // 4. Zamieniamy próg z powrotem na nazwę nuty
      const startNoteOfNewString = STRING_MAP[newSName];
      const startNoteIdx = NOTES_FROM_C.indexOf(startNoteOfNewString);
      let finalNoteIdx = (startNoteIdx + newFret) % 12;
      if (finalNoteIdx < 0) finalNoteIdx += 12;

      return `${newSName}_${NOTES_FROM_C[finalNoteIdx]}`;
    })
    .filter((p) => p !== null);
};

/**
 * Porównuje dwa relatywne kształty.
 */
export const isSameShape = (shapeA, shapeB) => {
  if (!shapeA || !shapeB || shapeA.length !== shapeB.length) return false;
  return JSON.stringify(shapeA) === JSON.stringify(shapeB);
};

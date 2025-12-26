import { NOTES_FROM_C } from "../data/notes";

const STRING_MAP = {
  E1: "E",
  A2: "A",
  D3: "D",
  G4: "G",
  B5: "B",
  E6: "E",
};

export const STRING_ORDER = ["E1", "A2", "D3", "G4", "B5", "E6"];
const STRING_OFFSETS = [0, 5, 10, 15, 19, 24];

export const getAbsoluteSemitones = (point) => {
  const [sName, nName] = point.split("_");
  const sIdx = STRING_ORDER.indexOf(sName);

  const startNote = STRING_MAP[sName];
  const startIndex = NOTES_FROM_C.indexOf(startNote);
  const targetIndex = NOTES_FROM_C.indexOf(nName);
  let fret = targetIndex - startIndex;
  if (fret < 0) fret += 12;

  return STRING_OFFSETS[sIdx] + fret;
};

export const transposeShape = (relativeShape, targetPoint) => {
  if (!relativeShape || relativeShape.length === 0 || !targetPoint) return [];

  const targetAbs = getAbsoluteSemitones(targetPoint);
  const [targetStringName] = targetPoint.split("_");
  const targetStringIdx = STRING_ORDER.indexOf(targetStringName);

  return relativeShape
    .map(([sDiff, iDiff]) => {
      const newSIdx = targetStringIdx + sDiff;
      if (newSIdx < 0 || newSIdx >= STRING_ORDER.length) return null;

      const newSName = STRING_ORDER[newSIdx];
      const newAbsValue = targetAbs + iDiff;

      // OBLICZENIE Z KOREKTĄ OKTAWY
      let newFret = newAbsValue - STRING_OFFSETS[newSIdx];

      // Jeśli próg jest ujemny (za siodełkiem),
      // przesuwamy go o oktawę w górę, aż będzie >= 0
      while (newFret < 0) {
        newFret += 12;
      }

      // 4. Zamieniamy próg z powrotem na nazwę nuty
      const startNoteOfNewString = STRING_MAP[newSName];
      const startNoteIdx = NOTES_FROM_C.indexOf(startNoteOfNewString);
      let finalNoteIdx = (startNoteIdx + newFret) % 12;
      if (finalNoteIdx < 0) finalNoteIdx += 12;

      return `${newSName}_${NOTES_FROM_C[finalNoteIdx]}`;
    })
    .filter((p) => p !== null);
};

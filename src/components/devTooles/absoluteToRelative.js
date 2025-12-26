import { getAbsoluteSemitones, STRING_ORDER } from "../../utils/transposer";

/**
 * Konwertuje tablicę punktów bezwzględnych na format względny [sDiff, iDiff].
 * Jako punkt odniesienia (anchor) przyjmuje pierwszy element tablicy.
 */
export const absoluteToRelative = (absolutePoints) => {
  if (!absolutePoints || absolutePoints.length === 0) return [];

  // 1. Definiujemy punkt zakotwiczenia (zazwyczaj pierwszy element)
  const anchorPoint = absolutePoints[0];
  const anchorAbs = getAbsoluteSemitones(anchorPoint);
  const [anchorStringName] = anchorPoint.split("_");
  const anchorStringIdx = STRING_ORDER.indexOf(anchorStringName);

  // 2. Przeliczamy każdy punkt względem zakotwiczenia
  return absolutePoints.map((point) => {
    const currentAbs = getAbsoluteSemitones(point);
    const [currentStringName] = point.split("_");
    const currentStringIdx = STRING_ORDER.indexOf(currentStringName);

    // Różnica w indeksach strun
    const sDiff = currentStringIdx - anchorStringIdx;

    // Różnica w półtonach (interwał)
    const iDiff = currentAbs - anchorAbs;

    return [sDiff, iDiff];
  });
};

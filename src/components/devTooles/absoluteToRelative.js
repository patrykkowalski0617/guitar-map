import { getAbsoluteSemitones, STRING_ORDER } from "../../utils/transposer";

export const absoluteToRelative = (absolutePoints) => {
  if (!absolutePoints || absolutePoints.length === 0) return [];

  const anchorPoint = absolutePoints[0];
  const anchorAbs = getAbsoluteSemitones(anchorPoint);
  const [anchorStringName] = anchorPoint.split("_");
  const anchorStringIdx = STRING_ORDER.indexOf(anchorStringName);

  return absolutePoints.map((point) => {
    const currentAbs = getAbsoluteSemitones(point);
    const [currentStringName] = point.split("_");
    const currentStringIdx = STRING_ORDER.indexOf(currentStringName);

    const sDiff = currentStringIdx - anchorStringIdx;

    const iDiff = currentAbs - anchorAbs;

    return [sDiff, iDiff];
  });
};

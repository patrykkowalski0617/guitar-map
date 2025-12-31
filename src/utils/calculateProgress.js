import { setsShapes } from "../data";
import { userProgress } from "../data";

export const getProgressData = () => {
  return setsShapes.map((set) => {
    const totalShapes = set.shapes.length;
    const learnedShapes = userProgress[set.id]?.length || 0;

    const percentage =
      totalShapes > 0 ? (learnedShapes / totalShapes) * 100 : 0;

    return {
      id: set.id,
      label: set.label,
      percentage: percentage,
      learnedCount: learnedShapes,
      totalCount: totalShapes,
    };
  });
};

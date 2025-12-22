import { NOTES_FROM_C } from "../data//music-theory";

const manageCAGED = (keyName, CAGED_shift) => {
  const CAGED_base = {
    C: [8, 20],
    A: [5, 17],
    G: [3, 15],
    E: [0, 12],
    D: [10, 22],
  };

  const result = {};

  Object.entries(CAGED_base).forEach(([shape, frets]) => {
    result[shape] = frets.map((fret) => {
      let newFret = fret + CAGED_shift;

      if (newFret > 24) {
        newFret -= 24;
      }

      return newFret;
    });
  });

  return result;
};
export default manageCAGED;

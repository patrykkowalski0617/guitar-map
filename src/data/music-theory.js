export const NOTES_FROM_C = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const UNIFIED_MUSIC_KEYS = NOTES_FROM_C.map((majorNote, index) => {
  const minorNoteIndex = (index + 9) % NOTES_FROM_C.length;
  const minorNote = NOTES_FROM_C[minorNoteIndex];
  const originalValue = `${majorNote}/${minorNote}m`;
  const replacements = {
    "D#/Cm": "Eb/Cm",
    "G#/Fm": "Ab/Fm",
    "C#/A#m": "Db/Bbm",
    "A#/Gm": "Bb/Gm",
  };
  const label = replacements[originalValue] || originalValue;
  return {
    majorNote,
    label,
  };
});

export const intervals = {
  _1: [0, "1"],
  _m2: [1, "m2"],
  _M2: [2, "M2"],
  _m3: [3, "m3"],
  _M3: [4, "M3"],
  _4: [5, "4"],
  _T: [6, "T"],
  _5: [7, "5"],
  _m6: [8, "m6"],
  _M6: [9, "M6"],
  _m7: [10, "m7"],
  _M7: [11, "M7"],
  _8: [12, "8"],
  _m9: [13, "m9"],
  _M9: [14, "M9"],
  _m10: [15, "m10"],
  _M10: [16, "M10"],
  _11: [17, "11"],
  _TT: [18, "TT"],
  _12: [19, "12"],
  _m13: [20, "m13"],
  _M13: [21, "M13"],
  _m14: [22, "m14"],
  _M14: [23, "M14"],
};
export const {
  _1,
  _m2,
  _M2,
  _m3,
  _M3,
  _4,
  _T,
  _5,
  _m6,
  _M6,
  _m7,
  _M7,
  _8,
  _m9,
  _M9,
  _m10,
  _M10,
  _11,
  _TT,
  _12,
  _m13,
  _M13,
  _m14,
  _M14,
} = intervals;

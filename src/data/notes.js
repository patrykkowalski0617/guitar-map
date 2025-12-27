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

export const enharmonicTransform = (text) => {
  const map = {
    "A#m": "Bbm",
    "A#": "Bb",
    "D#": "Eb",
    "G#": "Ab",
    "C#": "Db",
  };

  const pattern = new RegExp(Object.keys(map).join("|"), "g");

  return text.replace(pattern, (matched) => map[matched]);
};

export const UNIFIED_MUSIC_KEYS = NOTES_FROM_C.map((majorNote, index) => {
  const minorNoteIndex = (index + 9) % NOTES_FROM_C.length;
  const minorNote = NOTES_FROM_C[minorNoteIndex];
  const rawLabel = `${majorNote}/${minorNote}m`;
  const label = enharmonicTransform(rawLabel);

  return {
    majorNote,
    label,
  };
});

// export const UNIFIED_MUSIC_KEYS = NOTES_FROM_C.map((majorNote, index) => {
//   const minorNoteIndex = (index + 9) % NOTES_FROM_C.length;
//   const minorNote = NOTES_FROM_C[minorNoteIndex];
//   const originalValue = `${majorNote}/${minorNote}m`;
//   const replacements = {
//     "D#/Cm": "Eb/Cm",
//     "G#/Fm": "Ab/Fm",
//     "C#/A#m": "Db/Bbm",
//     "A#/Gm": "Bb/Gm",
//   };
//   const label = replacements[originalValue] || originalValue;
//   return {
//     majorNote,
//     label,
//   };
// });

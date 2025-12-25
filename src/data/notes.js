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

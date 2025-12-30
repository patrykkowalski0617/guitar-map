import { NOTES_FROM_C } from ".";
import { enharmonicTransform } from "../utils";

const UNIFIED_MUSIC_KEYS = NOTES_FROM_C.map((majorNote, index) => {
  const minorNoteIndex = (index + 9) % NOTES_FROM_C.length;
  const minorNote = NOTES_FROM_C[minorNoteIndex];
  const rawLabel = `${majorNote}/${minorNote}m`;
  const label = enharmonicTransform(rawLabel);

  return {
    majorNote,
    label,
  };
});

export default UNIFIED_MUSIC_KEYS;

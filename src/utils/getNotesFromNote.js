import { NOTES_FROM_C } from "../data/music-theory";

export const getNotesFromNote = (startFormNote, howManyNotes = 12) => {
  const startIndex = NOTES_FROM_C.indexOf(startFormNote);

  if (startIndex === -1) {
    throw new Error(`Note "${startFormNote}" does not exist in the database`);
  }

  return Array.from(
    { length: howManyNotes + 1 },
    (_, i) => NOTES_FROM_C[(startIndex + i) % NOTES_FROM_C.length]
  );
};

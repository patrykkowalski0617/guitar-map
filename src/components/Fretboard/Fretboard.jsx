import { getNotesStartingFrom } from "../../music-theory";
import { useMusicStore } from "../../store/useMusicStore";
import { toRoman } from "../../utils/toRoman";
import Note from "./Note";
import { FretboardContainer, FretCell, FretCount, StringRow } from "./parts";

const STRINGS = ["E", "B", "G", "D", "A", "E"];
const extendFretboardBy = 3;

const extendArray = (arr, count = extendFretboardBy) => {
  const elementsToAppend = arr.slice(0, count);
  return [...arr, ...elementsToAppend];
};

const Fretboard = () => {
  const { getActiveNotesSet, tuneKey, getActiveMarker } = useMusicStore();

  const activeSet = getActiveNotesSet();
  const activeMarker = getActiveMarker();

  if (!activeSet || !activeMarker || !tuneKey) {
    console.log("Fretboard: Oczekiwanie na synchronizację danych...");
    return null;
  }

  const notesOfKey = getNotesStartingFrom(tuneKey.majorNote);

  const findNotes = (set) => {
    if (!set?.notesSets?.template) return [];

    const template = set.notesSets.template.map((el) => el[0]);
    const startingPoint = set.keyDegree[0];
    const doubledScale = [...notesOfKey, ...notesOfKey];

    return template.map((index) => doubledScale[index + startingPoint]);
  };

  const notesSet = findNotes(activeSet);
  const activeMarkerNote = notesOfKey[activeMarker.keyDegree[0]];

  const fretCounts = extendArray(getNotesStartingFrom("E")).fill(null);

  return (
    <FretboardContainer>
      {STRINGS.map((string, sIdx) => {
        const stringId = `${string}-${6 - sIdx}`;
        const fretCells = extendArray(getNotesStartingFrom(string));

        return (
          <StringRow key={stringId}>
            {fretCells.map((note, fIdx) => {
              const fretId = `fret-${fIdx}`;

              const $isInSet = notesSet.includes(note);

              const $activeMarkerNote = activeMarkerNote === note;

              return (
                <FretCell
                  $numOfCells={fretCells.length}
                  key={`${stringId}-${fretId}`}
                >
                  <Note
                    note={note}
                    stringId={stringId}
                    fretId={fretId}
                    $isInSet={$isInSet}
                    $activeMarkerNote={$activeMarkerNote}
                  />
                </FretCell>
              );
            })}
          </StringRow>
        );
      })}

      {/* Rząd z numeracją progów (Rzymską) */}
      <StringRow>
        {fretCounts.map((_, fIdx) => (
          <FretCount key={`fret-count-${fIdx}`} $numOfCells={fretCounts.length}>
            {toRoman(fIdx)}
          </FretCount>
        ))}
      </StringRow>
    </FretboardContainer>
  );
};

export default Fretboard;

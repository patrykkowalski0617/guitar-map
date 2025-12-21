import { getNotesStartingFrom } from "../../music-theory";
import { toRoman } from "../../utils/toRoman";
import Note from "./Note";
import { FretboardContainer, FretCell, StringRow } from "./parts";

const STRINGS = ["E", "B", "G", "D", "A", "E"];
const extendFretboardBy = 3;
const extendArray = (arr, count = extendFretboardBy) => {
  const elementsToAppend = arr.slice(0, count);
  return [...arr, ...elementsToAppend];
};

const Fretboard = () => {
  return (
    <FretboardContainer>
      {STRINGS.map((string, sIdx) => {
        const stringId = `${string}-${6 - sIdx}`;
        const fretCells = extendArray(getNotesStartingFrom(string));
        return (
          <StringRow key={stringId}>
            {fretCells.map((note, fIdx) => {
              const fretId = `fret-${fIdx}`;
              return (
                <FretCell
                  $numOfCells={fretCells.length}
                  key={`${stringId}-${fretId}`}
                >
                  <Note note={note} stringId={stringId} fretId={fretId}></Note>
                </FretCell>
              );
            })}
          </StringRow>
        );
      })}
      {
        <StringRow>
          {extendArray(getNotesStartingFrom("E"))
            .fill(null)
            .map((x, fIdx) => {
              const fretId = fIdx;
              return (
                <FretCell key={`fret-count-${fIdx}`}>
                  {toRoman(fretId)}
                </FretCell>
              );
            })}
        </StringRow>
      }
    </FretboardContainer>
  );
};

export default Fretboard;

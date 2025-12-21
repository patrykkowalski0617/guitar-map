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
        const strigId = `${string}-${6 - sIdx}`;
        const fretCells = extendArray(getNotesStartingFrom(string));
        return (
          <StringRow key={strigId}>
            {fretCells.map((note, fIdx) => {
              const fretId = `fret-${fIdx + 1}`;
              return (
                <FretCell
                  $numOfCells={fretCells.length}
                  key={`${strigId}-${fretId}`}
                >
                  <Note note={note} strigId={strigId} fretId={fretId}></Note>
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

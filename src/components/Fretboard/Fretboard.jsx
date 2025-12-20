import { getNotesStartingFrom } from "../../music-theory";
import { FretboardContainer, FretCell, StringRow, Note } from "./parts";

const STRINGS = ["E", "B", "G", "D", "A", "E"];

const Fretboard = () => {
  return (
    <FretboardContainer>
      {STRINGS.map((string, sIdx) => (
        <StringRow key={`string-${sIdx}`}>
          {getNotesStartingFrom(string).map((note, fIdx) => (
            <FretCell key={`fret-${sIdx}-${fIdx}`}>
              <Note $noteType={"root"}>{note}</Note>
            </FretCell>
          ))}
        </StringRow>
      ))}
    </FretboardContainer>
  );
};

export default Fretboard;

import SegmentedSelect from "./components/forms/Selects/SegmentedSelect";
import Fretboard from "./components/Fretboard/Fretboard";
import {
  MUSIC_KEYS,
  MUSIC_FUCTIONS,
  MUSIC_FUCTIONS_NAMES,
} from "./music-theory";
import { useMusicStore } from "./store/useMusicStore";

function App() {
  const {
    tuneKey,
    setTuneKey,
    musicFunction,
    setMusicFunction,
    notesSet,
    setNotesSet,
  } = useMusicStore();
  const notesSets = Object.keys(MUSIC_FUCTIONS[musicFunction]).concat([
    "Agregate",
  ]);
  console.log(notesSets);

  return (
    <>
      <SegmentedSelect
        label="Unified keys"
        options={MUSIC_KEYS}
        value={tuneKey}
        onChange={setTuneKey}
      />

      <SegmentedSelect
        label="Unified functions"
        options={MUSIC_FUCTIONS_NAMES}
        value={musicFunction}
        onChange={setMusicFunction}
      />
      <SegmentedSelect
        label="Function type"
        options={notesSets}
        value={notesSet}
        onChange={setNotesSet}
      />

      <div>
        {tuneKey} {musicFunction}
        {console.log(MUSIC_FUCTIONS[musicFunction][notesSet])}
      </div>
      <Fretboard />
    </>
  );
}

export default App;

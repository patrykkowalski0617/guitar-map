import SegmentedSelect from "./components/forms/Selects/SegmentedSelect";
import Fretboard from "./components/Fretboard/Fretboard";
import {
  MUSIC_KEYS,
  MUSIC_FUCTIONS,
  MUSIC_FUCTIONS_NAMES,
  chordTypes as _chordTypes,
} from "./music-theory";
import { useMusicStore } from "./store/useMusicStore";
import "./App.css";

function App() {
  const {
    tuneKey,
    setTuneKey,
    musicFunction,
    setMusicFunction,
    functionType,
    setFunctionType,
    notesSet,
    setNotesSet,
    chordType,
    setChordType,
  } = useMusicStore();
  const functionTypes = Object.keys(MUSIC_FUCTIONS[musicFunction]).concat([
    "Agregate",
  ]);
  const notesSets = Object.keys(MUSIC_FUCTIONS[musicFunction][functionType]);
  const chordTypes = Object.keys(_chordTypes);
  return (
    <>
      <SegmentedSelect
        label="Unified functions"
        options={MUSIC_FUCTIONS_NAMES}
        value={musicFunction}
        onChange={setMusicFunction}
      />
      <SegmentedSelect
        label="Function type"
        options={functionTypes}
        value={functionType}
        onChange={setFunctionType}
      />
      <SegmentedSelect
        label="Notes sets"
        options={notesSets}
        value={notesSet}
        onChange={setNotesSet}
      />

      <SegmentedSelect
        label={`Chord types`}
        options={chordTypes}
        value={chordType}
        onChange={setChordType}
      />

      <Fretboard />

      <SegmentedSelect
        label="Unified keys"
        options={MUSIC_KEYS}
        value={tuneKey}
        onChange={setTuneKey}
      />
      {console.log(tuneKey, musicFunction, functionType, notesSet, chordType)}
    </>
  );
}

export default App;

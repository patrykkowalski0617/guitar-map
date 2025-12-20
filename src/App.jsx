import SegmentedSelect from "./components/forms/Selects/SegmentedSelect";
import { NOTES_FROM_C, MUSIC_FUCTIONS_NAMES } from "./music-theory";
import { useMusicStore } from "./store/useMusicStore";

function App() {
  const { tuneKey, setTuneKey, musicFunction, setMusicFunction } =
    useMusicStore();

  return (
    <>
      <SegmentedSelect
        label="Major scale degree"
        options={NOTES_FROM_C}
        value={tuneKey}
        onChange={setTuneKey}
      />

      <SegmentedSelect
        label="Mine set of functions"
        options={MUSIC_FUCTIONS_NAMES}
        value={musicFunction}
        onChange={setMusicFunction}
      />
      <div>
        {tuneKey} {musicFunction}
      </div>
    </>
  );
}

export default App;

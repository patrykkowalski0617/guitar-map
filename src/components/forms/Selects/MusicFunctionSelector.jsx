import {
  getNotesStartingFrom,
  notesSetsInFunctionContexts,
} from "../../../data/music-theory";
import { useMusicStore } from "../../../store/useMusicStore";
import SegmentedSelect from "./SegmentedSelect";

const MusicFunctionSelector = () => {
  const {
    tuneKey,
    selectedFunctionContext,
    selectedNotesSetName,
    selectedMarkerName,
    setFunctionContextName,
    setNotesSetName,
    setMarkerName,
    getActiveNotesSet,
  } = useMusicStore();

  const keyNotes = getNotesStartingFrom(tuneKey.majorNote);
  const contextOptions = notesSetsInFunctionContexts.map(
    (ctx) => ctx.FunctionContextName
  );
  const currentContext = notesSetsInFunctionContexts.find(
    (ctx) => ctx.FunctionContextName === selectedFunctionContext
  );
  const notesSetOptions = currentContext
    ? currentContext.notesSets.map((ns) => ns.getNotesSetName(keyNotes))
    : [];
  const activeSet = getActiveNotesSet();
  const markerOptions = activeSet?.notesMarkers
    ? activeSet.notesMarkers.map((m) => m.getMarkerName(keyNotes))
    : [];

  return (
    <>
      <SegmentedSelect
        label="Choose Function Contexts"
        options={contextOptions}
        value={selectedFunctionContext}
        onChange={setFunctionContextName}
      />

      {notesSetOptions.length > 0 && (
        <SegmentedSelect
          label="Choose Set of Notes"
          options={notesSetOptions}
          value={selectedNotesSetName}
          onChange={setNotesSetName}
        />
      )}

      {markerOptions.length > 0 && (
        <SegmentedSelect
          label="Mark specific note"
          options={markerOptions}
          value={selectedMarkerName}
          onChange={setMarkerName}
        />
      )}
    </>
  );
};

export default MusicFunctionSelector;

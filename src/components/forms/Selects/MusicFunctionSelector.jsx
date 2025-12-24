import { notesSetsInFunctionContexts } from "../../../data/music-theory";
import { isTestMode } from "../../../settings";
import { useMusicStore } from "../../../store/useMusicStore";
import { getNotesFromNote } from "../../../utils/getNotesFromNote";
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

  const keyNotes = getNotesFromNote(tuneKey.majorNote);
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
        label="Choose Unified Function Contexts"
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
      Set fancy role name: Major Tonic | Major Tonic upper structure | Minor
      Tonic | Minor Tonic upper structure
      <br></br>
      What it actually highlights (color): Major Tonic Root | Major Tonic 3th...
      <br></br>
      Shape: XM, XM7, Xadd9, XM9, ...
      {markerOptions.length > 0 && isTestMode && (
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

import { useState, useMemo } from "react";
import { useStore } from "../../store/useStore";
import { FretboardContainer } from "./parts";
import FretRow from "./FretRow";
import FretboardLabels from "./FretboardLabels";
import { isDevMode } from "../../settings";
import { getNotesFromNote, manageCAGED } from "../../utils";
import DevTools from "../devTooles/DevTools";
import ScrollFader from "../ScrollFader/ScrollFader";
import { CAGED_shapes, NOTES_FROM_C } from "../../data";
import useFretboardLogic from "./hooks/useFretboardLogic";
import { useSequencer } from "../SequencerSettings/hooks/useSequencer";

const STRINGS_FIRST_NOTES = ["E", "B", "G", "D", "A", "E"];
const numberOfFrets = 16;

const Fretboard = () => {
  const {
    tuneKey,
    getActiveChordVariants,
    getActiveShapeRootNote,
    shape,
    setShape,
    variantState,
    setVariantState,
    seqConfig,
  } = useStore();

  const [userShape, setUserShape] = useState([]);
  const [lockedCAGEDLetter, setLockedCAGEDLetter] = useState(null);
  const [mouseOverLetter, setMouseOverLetter] = useState(null);

  const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
  const activeChordVariants = getActiveChordVariants();
  const activeShapeRootNote = getActiveShapeRootNote();

  const currentSeqConfig = seqConfig || {
    isRunning: false,
    interval: 300,
    activePattern: "linear",
  };
  useSequencer(shape, currentSeqConfig);

  const combinedCAGEDShape = useMemo(() => {
    const lockedNotes = lockedCAGEDLetter
      ? CAGED_shapes[lockedCAGEDLetter] || []
      : [];
    const hoverNotes = mouseOverLetter
      ? CAGED_shapes[mouseOverLetter] || []
      : [];

    return [...new Set([...lockedNotes, ...hoverNotes])];
  }, [lockedCAGEDLetter, mouseOverLetter]);

  const activeRootIds = useMemo(() => {
    if (!activeShapeRootNote) return [];
    const ids = [];
    STRINGS_FIRST_NOTES.forEach((sName, sIdx) => {
      const stringId = `${sName}${6 - sIdx}`;
      getNotesFromNote(sName, numberOfFrets).forEach((noteName) => {
        if (noteName === activeShapeRootNote) {
          let index = (NOTES_FROM_C.indexOf(noteName) - CAGED_shift + 12) % 12;
          ids.push(`${stringId}_${NOTES_FROM_C[index]}`);
        }
      });
    });
    return ids;
  }, [activeShapeRootNote, CAGED_shift]);

  const { handleNoteClick } = useFretboardLogic({
    activeShapeRootNote,
    activeChordVariants,
    variantState,
    setVariantState,
    setShape,
    activeRootIds,
    isDevMode,
    setUserShape,
    setLockedCAGEDLetter,
    lockedCAGEDLetter,
  });

  const handleCAGED_Click = (letter) => {
    setVariantState({ lastId: null, variantId: null });
    const isLocking = lockedCAGEDLetter !== letter;
    setLockedCAGEDLetter(isLocking ? letter : null);
    setShape([]);
  };

  const handleCAGED_MouseOver = (letter) => {
    setMouseOverLetter(letter);
  };

  const handleCAGED_MouseLeave = () => {
    setMouseOverLetter(null);
  };

  return (
    <>
      <ScrollFader>
        <FretboardContainer>
          {STRINGS_FIRST_NOTES.map((string, sIdx) => (
            <FretRow
              key={string + sIdx}
              string={string}
              sIdx={sIdx}
              numberOfFrets={numberOfFrets}
              CAGED_shift={CAGED_shift}
              handleNoteClick={handleNoteClick}
              shape={shape}
              CAGED_hoverShape={combinedCAGEDShape}
              userShape={userShape}
              activeShapeRootNote={activeShapeRootNote}
              variantState={variantState}
            />
          ))}
          <FretboardLabels
            fretCounts={getNotesFromNote("E", numberOfFrets).fill(null)}
            CAGED={manageCAGED(tuneKey.majorNote, CAGED_shift)}
            handleCAGED_Click={handleCAGED_Click}
            handleCAGED_MouseOver={handleCAGED_MouseOver}
            handleCAGED_MouseLeave={handleCAGED_MouseLeave}
            lockedCAGEDLetter={lockedCAGEDLetter}
          />
        </FretboardContainer>
      </ScrollFader>
      {isDevMode && (
        <DevTools
          userShape={userShape}
          handleClearUserShape={() => setUserShape([])}
        />
      )}
    </>
  );
};
export default Fretboard;

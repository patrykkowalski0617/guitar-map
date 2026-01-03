import { useState, useMemo } from "react";
import { useStore } from "../../store/useStore";
import { FretboardContainer } from "./parts";
import FretRow from "./FretRow";
import FretboardLabels from "./FretboardLabels";
import { getNotesFromNote, manageCAGED } from "../../utils";
import DevTools from "../devTooles/DevTools";
import ScrollFader from "../ScrollFader/ScrollFader";
import { CAGED_shapes, NOTES_FROM_C } from "../../data";
import useFretboardLogic from "./hooks/useFretboardLogic";
import { useSequencer } from "../FretboardHeader/hooks/useSequencer";
import FretboardHeader from "../FretboardHeader/FretboardHeader";
import userProgress from "../../data/userProgress";

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
    isProgressMode,
    isDevMode,
  } = useStore();

  const activeChordId = useStore((state) => state.getActiveChordId());
  const [userShape, setUserShape] = useState([]);
  const [lockedCAGEDLetter, setLockedCAGEDLetter] = useState(null);
  const [mouseOverLetter, setMouseOverLetter] = useState(null);
  const [lockedShape, setLockedShape] = useState([]);

  const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
  const activeChordVariants = getActiveChordVariants();
  const activeShapeRootNote = getActiveShapeRootNote();

  const isCurrentShapeSaved = useMemo(() => {
    if (!isProgressMode || !variantState?.variantId) return false;
    return (userProgress[activeChordId] || []).includes(variantState.variantId);
  }, [variantState.variantId, isProgressMode, activeChordId]);

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

  const { handleNoteClick } = useFretboardLogic({
    activeShapeRootNote,
    activeChordVariants,
    variantState,
    setVariantState,
    setShape,
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

  const toggleLockShape = () => {
    if (lockedShape.length > 0) {
      setLockedShape([]);
    } else {
      setLockedShape([...shape]);
    }
  };

  return (
    <>
      <FretboardHeader
        lockedCAGEDLetter={lockedCAGEDLetter}
        lockedShape={lockedShape}
        toggleLockShape={toggleLockShape}
      />
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
              userShape={isDevMode ? userShape : []}
              activeShapeRootNote={activeShapeRootNote}
              variantState={variantState}
              lockedShape={lockedShape}
              isCurrentShapeSaved={isCurrentShapeSaved}
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

      <DevTools
        userShape={userShape}
        handleClearUserShape={() => setUserShape([])}
      />
    </>
  );
};
export default Fretboard;

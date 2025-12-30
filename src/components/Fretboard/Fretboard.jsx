import { useState, useMemo } from "react";
import { useStore } from "../../store/useStore";
import manageCAGED from "../../utils/manageCAGED";
import { FretboardContainer } from "./parts";
import FretRow from "./FretRow";
import FretboardLabels from "./FretboardLabels";
import { isDevMode } from "../../settings";
import { getNotesFromNote } from "../../utils/getNotesFromNote";
import { NOTES_FROM_C } from "../../data/notes";
import { transposeShape } from "../../utils/transposer";
import DevTools from "../devTooles/DevTools";
import ScrollFader from "../ScrollFader/ScrollFader";
import { CAGED_hoverShapes } from "../../data/data";

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
  } = useStore();

  const [userShape, setUserShape] = useState([]);
  const [CAGED_hoverShape, setCAGED_hoverShape] = useState([]);
  const [lockedCAGEDLetter, setLockedCAGEDLetter] = useState(null);

  const fretCounts = getNotesFromNote("E", numberOfFrets).fill(null);
  const CAGED_shift = NOTES_FROM_C.indexOf(tuneKey.majorNote);
  const CAGED = manageCAGED(tuneKey.majorNote, CAGED_shift);

  const activeChordVariants = getActiveChordVariants();
  const activeShapeRootNote = getActiveShapeRootNote();

  const activeRootIds = useMemo(() => {
    if (!activeShapeRootNote) return [];
    const ids = [];
    STRINGS_FIRST_NOTES.forEach((sName, sIdx) => {
      const stringId = `${sName}${6 - sIdx}`;
      const notesOnString = getNotesFromNote(sName, numberOfFrets);

      notesOnString.forEach((noteName) => {
        if (noteName === activeShapeRootNote) {
          let index = NOTES_FROM_C.indexOf(noteName) - CAGED_shift;
          if (index < 0) index += 12;
          ids.push(`${stringId}_${NOTES_FROM_C[index]}`);
        }
      });
    });
    return ids;
  }, [activeShapeRootNote, CAGED_shift]);

  const handleNoteClick = (note, CAGED_noteId) => {
    if (isDevMode) {
      setUserShape((prev) =>
        prev.includes(CAGED_noteId)
          ? prev.filter((id) => id !== CAGED_noteId)
          : [...prev, CAGED_noteId]
      );
    }

    if (activeShapeRootNote === note && activeChordVariants.length > 0) {
      const stringId = CAGED_noteId.split("_")[0];

      const availableIndices = activeChordVariants
        .map((v, idx) => {
          const isAllowed = !v.notAllowedOnStrings?.includes(stringId);
          const transposed = isAllowed
            ? transposeShape(v.shape, CAGED_noteId)
            : [];
          const matchesCAGED =
            transposed.length > 0 &&
            (CAGED_hoverShape.length === 0 ||
              transposed.every((id) => CAGED_hoverShape.includes(id)));
          return matchesCAGED ? idx : null;
        })
        .filter((idx) => idx !== null);

      let nextAction = null;

      if (variantState.lastId !== CAGED_noteId) {
        nextAction = availableIndices.length > 0 ? availableIndices[0] : "SUM";
      } else {
        const currentInAvailableIdx = availableIndices.indexOf(
          variantState.index
        );

        if (
          currentInAvailableIdx !== -1 &&
          currentInAvailableIdx < availableIndices.length - 1
        ) {
          nextAction = availableIndices[currentInAvailableIdx + 1];
        } else if (variantState.index === "SUM") {
          nextAction =
            availableIndices.length > 0 ? availableIndices[0] : "SUM";
        } else {
          nextAction = "SUM";
        }
      }

      const totalSteps = availableIndices.length + 1;
      const currentStep =
        nextAction === "SUM"
          ? totalSteps
          : availableIndices.indexOf(nextAction) + 1;

      console.log(`Wariant: ${currentStep}/${totalSteps}`);

      if (nextAction === "SUM") {
        const combinedShapeSet = new Set();
        activeRootIds.forEach((rootId) => {
          const rStringId = rootId.split("_")[0];
          const validVariant = activeChordVariants.find((v) => {
            if (v.notAllowedOnStrings?.includes(rStringId)) return false;
            const t = transposeShape(v.shape, rootId);
            return (
              t.length > 0 &&
              (CAGED_hoverShape.length === 0 ||
                t.every((id) => CAGED_hoverShape.includes(id)))
            );
          });

          if (validVariant) {
            transposeShape(validVariant.shape, rootId).forEach((id) =>
              combinedShapeSet.add(id)
            );
          }
        });

        setShape(Array.from(combinedShapeSet));
        setVariantState({ lastId: CAGED_noteId, index: "SUM" });
      } else {
        const variant = activeChordVariants[nextAction];
        const transposed = transposeShape(variant.shape, CAGED_noteId);
        setShape(transposed);
        setVariantState({ lastId: CAGED_noteId, index: nextAction });
      }
    }
  };
  const handleCAGED_MouseOver = (cagedLetter) => {
    if (lockedCAGEDLetter) return;
    setVariantState({ lastId: null, index: 0 });
    setCAGED_hoverShape(CAGED_hoverShapes[cagedLetter]);
  };

  const handleCAGED_MouseLeave = () => {
    if (lockedCAGEDLetter) return;
    setCAGED_hoverShape([]);
  };

  const handleCAGED_Click = (cagedLetter) => {
    setVariantState({ lastId: null, index: 0 });
    if (lockedCAGEDLetter === cagedLetter) {
      setLockedCAGEDLetter(null);
      setCAGED_hoverShape([]);
    } else {
      setLockedCAGEDLetter(cagedLetter);
      setCAGED_hoverShape(CAGED_hoverShapes[cagedLetter]);
    }
    setShape([]);
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
              CAGED_hoverShape={CAGED_hoverShape}
              userShape={userShape}
              activeShapeRootNote={activeShapeRootNote}
            />
          ))}
          <FretboardLabels
            fretCounts={fretCounts}
            CAGED={CAGED}
            handleCAGED_MouseOver={handleCAGED_MouseOver}
            handleCAGED_MouseLeave={handleCAGED_MouseLeave}
            handleCAGED_Click={handleCAGED_Click}
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

import React, { useState } from "react";
import { Button } from "../../parts";
import { useStore } from "../../store/useStore";
import ProfileRow from "./ProfileRow";
import { useSoundEngine } from "./hooks/useSoundEngine";
import * as S from "./parts";

const ColorProfileVisualizer = () => {
  const store = useStore();
  const engine = useSoundEngine();
  const [activeChordType, setActiveChordType] = useState(null);

  if (!store.activeShape?.colorProfile || !store.activeMusicContext)
    return null;

  const {
    activeShape,
    activeMusicContext,
    getNoteNameByOffset,
    getActiveShapeName,
    tuneKey,
    getContextNotes,
    getShapeNotes,
  } = store;

  const activeShapeName = getActiveShapeName();
  const majorRootName = getNoteNameByOffset(activeMusicContext.majorRoot);
  const minorRootName = getNoteNameByOffset(activeMusicContext.minorRoot);
  const shapeNotes = getShapeNotes();
  const contextNotes = getContextNotes();

  const handleToggleChord = async (type) => {
    await engine.unlockAudio();
    if (activeChordType === type) {
      engine.stopAllNotes();
      setActiveChordType(null);
      return;
    }
    engine.stopAllNotes();
    setActiveChordType(type);
    const notes =
      type === "major" ? contextNotes.majorRoot : contextNotes.minorRoot;
    if (notes) notes.forEach((n) => engine.playNote(n, 4, true));
  };

  const key = tuneKey.label;
  const id = activeMusicContext.id;
  const descriptions = {
    tonic: (
      <>
        In the key of <span>{key}</span>, a sense of resolution may be provided
        by the <span>{majorRootName}&nbsp;Major</span> or{" "}
        <span>{minorRootName}&nbsp;Minor</span> chords.{" "}
        <span>{activeShapeName} Set</span> will expose the following colors of
        each:
      </>
    ),

    subdominant: (
      <>
        In the key of <span>{key}</span>, a sense of motion may be provided by
        the <span>{majorRootName}&nbsp;Major</span> or{" "}
        <span>{minorRootName}&nbsp;Minor</span> chords.{" "}
        <span>{activeShapeName} Set</span> will expose the following colors of
        each:
      </>
    ),

    dominant: (
      <>
        In the key of <span>{key}</span>, a sense of tension to{" "}
        <span>{key.split("/")[0]} Major</span> chord may be provided by the{" "}
        <span>{majorRootName}&nbsp;Major</span> chord.{" "}
        <span>{activeShapeName}</span> Set will expose the following colors of
        it:
      </>
    ),

    phDominant: (
      <>
        In the key of <span>{key}</span>, a sense of tension to{" "}
        <span>{key.split("/")[1]?.replace("m", "")} Minor</span> chord may be
        provided by the <span>{majorRootName}&nbsp;Major</span> chord.{" "}
        <span>{activeShapeName} Set</span> will expose the following colors of
        it:
      </>
    ),
  };

  const description =
    id === "tonics"
      ? descriptions.tonic
      : id === "subdominants"
      ? descriptions.subdominant
      : id === "dominant"
      ? descriptions.dominant
      : id === "dominant-ph"
      ? descriptions.phDominant
      : "";

  return (
    <>
      <S.Description>{description}</S.Description>
      <S.VisualizerContainer>
        <S.ProfileRowWrapper>
          <ProfileRow
            label={majorRootName + " Major"}
            profile={activeShape.colorProfile.major}
            shapeNotes={shapeNotes}
            activeShapeName={activeShapeName}
            isRowActive={activeChordType === "major"}
            engine={engine}
          />
          <Button
            $active={activeChordType === "major"}
            onClick={() => handleToggleChord("major")}
          >
            {activeChordType === "major"
              ? `Stop`
              : `Play ${majorRootName} Major`}
          </Button>
        </S.ProfileRowWrapper>

        {activeShape.colorProfile.minor && (
          <S.ProfileRowWrapper>
            <ProfileRow
              label={minorRootName + " Minor"}
              profile={activeShape.colorProfile.minor}
              shapeNotes={shapeNotes}
              activeShapeName={activeShapeName}
              isRowActive={activeChordType === "minor"}
              engine={engine}
            />
            <Button
              $active={activeChordType === "minor"}
              onClick={() => handleToggleChord("minor")}
            >
              {activeChordType === "minor"
                ? `Stop`
                : `Play ${minorRootName} Minor`}
            </Button>
          </S.ProfileRowWrapper>
        )}
      </S.VisualizerContainer>
    </>
  );
};

export default ColorProfileVisualizer;

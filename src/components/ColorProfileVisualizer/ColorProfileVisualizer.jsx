import { useState } from "react";
import { Button } from "../../parts";
import { useStore } from "../../store/useStore";
import ProfileRow from "./ProfileRow";
import { useSoundEngine } from "./hooks/useSoundEngine";
import * as S from "./parts";
import Description from "./Description";

const ColorProfileVisualizer = () => {
  const store = useStore();
  const engine = useSoundEngine();
  const [activeChordType, setActiveChordType] = useState(null);

  const {
    activeShape,
    activeMusicContext,
    getNoteNameByOffset,
    getActiveShapeName,
    getContextNotes,
    getShapeNotes,
  } = store;

  const activeShapeName = getActiveShapeName();
  const majorRootName = getNoteNameByOffset(activeMusicContext.majorRoot);
  const minorRootName = getNoteNameByOffset(activeMusicContext.minorRoot);
  const shapeNotes = getShapeNotes();
  const contextNotes = getContextNotes();

  if (!store.activeShape?.colorProfile || !store.activeMusicContext)
    return null;

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

  return (
    <>
      <S.Description>
        <Description
          majorRootName={majorRootName}
          minorRootName={minorRootName}
          activeShapeName={activeShapeName}
        />
      </S.Description>
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

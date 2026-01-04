import { useStore } from "../../store/useStore";
import { useSoundEngine } from "./hooks/useSoundEngine";
import { useVisualizerSequence } from "./hooks/useVisualizerSequence";
import ProfileRow from "./ProfileRow";
import Description from "./Description";
import * as S from "./parts";

const ColorProfileVisualizer = () => {
  const store = useStore();
  const engine = useSoundEngine();

  const { activeChordType, activeInterval, playSequence, stopSequence } =
    useVisualizerSequence(engine);

  const {
    activeShape,
    activeMusicContext,
    getNoteNameByOffset,
    getActiveShapeName,
    getContextNotes,
    getShapeNotes,
    tuneKey,
  } = store;

  if (!activeShape?.colorProfile || !activeMusicContext) return null;

  const activeShapeName = getActiveShapeName();
  const majorRootName = getNoteNameByOffset(activeMusicContext.majorRoot);
  const minorRootName = getNoteNameByOffset(activeMusicContext.minorRoot);
  const shapeNotes = getShapeNotes();
  const contextNotes = getContextNotes();

  const handleToggle = (type) => {
    if (activeChordType === type) {
      stopSequence();
    } else {
      const chordNotes =
        type === "major" ? contextNotes.majorRoot : contextNotes.minorRoot;
      const profile =
        type === "major"
          ? activeShape.colorProfile.major
          : activeShape.colorProfile.minor;
      playSequence(type, chordNotes, profile, activeShape.rootSemitone);
    }
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
            label={`${majorRootName} Major`}
            profile={activeShape.colorProfile.major}
            shapeNotes={shapeNotes}
            activeShapeName={activeShapeName}
            isRowActive={activeChordType === "major"}
            activeInterval={activeChordType === "major" ? activeInterval : null}
            engine={engine}
            onToggle={() => handleToggle("major")}
          />
        </S.ProfileRowWrapper>

        {activeShape.colorProfile.minor && (
          <S.ProfileRowWrapper>
            <ProfileRow
              label={`${minorRootName} Minor`}
              profile={activeShape.colorProfile.minor}
              shapeNotes={shapeNotes}
              activeShapeName={activeShapeName}
              isRowActive={activeChordType === "minor"}
              activeInterval={
                activeChordType === "minor" ? activeInterval : null
              }
              engine={engine}
              onToggle={() => handleToggle("minor")}
            />
          </S.ProfileRowWrapper>
        )}
      </S.VisualizerContainer>
    </>
  );
};

export default ColorProfileVisualizer;

import { useStore } from "../../store/useStore";
import ProfileRow from "./ProfileRow";
import * as S from "./parts";

const ColorProfileVisualizer = () => {
  const {
    activeShape,
    activeMusicContext,
    getNoteNameByOffset,
    getActiveShapeName,
    tuneKey,
  } = useStore();

  if (!activeShape?.colorProfile || !activeMusicContext) return null;

  const activeShapeName = getActiveShapeName();
  const majorRootName = getNoteNameByOffset(activeMusicContext.majorRoot);
  const minorRootName = getNoteNameByOffset(activeMusicContext.minorRoot);

  const activeContextName = activeMusicContext.FunctionContextName;
  const key = tuneKey.label;

  const descriptions = {
    tonic: (
      <>
        Tonics provide a sense of resolution. In the key of <span>{key}</span>,
        the tonics are <span>{majorRootName} Major</span> and{" "}
        <span>{minorRootName} Minor</span> chords. Color profile of{" "}
        <span>{activeShapeName}</span> played over:
      </>
    ),
    subdominant: (
      <>
        Subdominants provide a sense of motion. In the key of <span>{key}</span>
        , the subdominants are <span>{majorRootName} Major</span> and{" "}
        <span>{minorRootName} Minor</span> chords. Color profile of{" "}
        <span>{activeShapeName}</span> played over:
      </>
    ),
    dominant: (
      <>
        Dominant provides a sense of tension and wants to resolve to the Tonic.
        In the key of <span>{key.split("/")[0]}</span>, the dominant is{" "}
        <span>{majorRootName} Major</span> chord. In the key of{" "}
        <span>{key.split("/")[1]}</span> you should use Phrygian Dominant
        Context. Color profile of <span>{activeShapeName}</span> played over:
      </>
    ),
    phDominant: (
      <>
        Phrygian Dominant provides a sense of tension and wants to resolve to
        the Tonic. In the key of <span>{key.split("/")[1]}</span>, the Phrygian
        Dominant is <span>{majorRootName} Major</span> chord. In the key of{" "}
        <span>{key.split("/")[0]}</span> you should use Dominant Context. Color
        profile of <span>{activeShapeName}</span> played over:
      </>
    ),
  };

  const description =
    activeContextName === "Tonics"
      ? descriptions.tonic
      : activeContextName === "Subdominants"
      ? descriptions.subdominant
      : activeContextName === "Dominant"
      ? descriptions.dominant
      : activeContextName === "Phrygian Dominant"
      ? descriptions.phDominant
      : "";
  return (
    <>
      <S.Description>{description}</S.Description>
      <S.VisualizerContainer>
        <ProfileRow
          label={majorRootName + " Major"}
          profile={activeShape.colorProfile.major}
          rootNoteName={majorRootName}
        />
        {activeShape.colorProfile.minor && (
          <ProfileRow
            label={minorRootName + " Minor"}
            profile={activeShape.colorProfile.minor}
            rootNoteName={minorRootName}
          />
        )}
      </S.VisualizerContainer>
    </>
  );
};

export default ColorProfileVisualizer;

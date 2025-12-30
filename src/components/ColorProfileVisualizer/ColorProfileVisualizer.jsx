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
        they are <span>{majorRootName}</span> Major and{" "}
        <span>{minorRootName}</span> Minor chords.
        <span>{activeShapeName}</span> expose following colors of:
      </>
    ),
    subdominant: (
      <>
        Subdominants provide a sense of motion. In the key of <span>{key}</span>
        , they are <span>{majorRootName}</span> Major and{" "}
        <span>{minorRootName}</span> Minor chords.
        <span>{activeShapeName}</span> expose following colors of:
      </>
    ),
    dominant: (
      <>
        Dominants provide a sense of tension and wants to resolve to the Major
        Tonic. In the key of <span>{key.split("/")[0]}</span>, the dominant is{" "}
        <span>{majorRootName}</span> Major chord. <span>{activeShapeName}</span>{" "}
        expose following colors of:
      </>
    ),
    phDominant: (
      <>
        Dominants provides a sense of tension and wants to resolve to the Minor
        Tonic. In the key of <span>{key.split("/")[1]}</span>, the Phrygian
        Dominant is <span>{majorRootName}</span> Major chord.
        <span>{activeShapeName}</span> expose following colors of:
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

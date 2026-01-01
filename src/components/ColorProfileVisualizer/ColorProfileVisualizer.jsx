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

  const id = activeMusicContext.id;
  const key = tuneKey.label;

  const descriptions = {
    tonic: (
      <>
        In the key of <span>{key}</span>, a sense of resolution may be provided
        by the <span>{majorRootName}</span> Major and{" "}
        <span>{minorRootName}</span> Minor chords.{" "}
        <span>{activeShapeName}</span> will expose the following colors of each:
      </>
    ),
    subdominant: (
      <>
        In the key of <span>{key}</span>, a sense of motion may be provided by
        the <span>{majorRootName}</span> Major and <span>{minorRootName}</span>{" "}
        Minor chords. <span>{activeShapeName}</span> will expose the following
        colors of each:
      </>
    ),
    dominant: (
      <>
        In the key of <span>{key}</span>, a sense of tension to{" "}
        <span>{key.split("/")[0]} Major</span> chord may be provided by the{" "}
        <span>{majorRootName}</span> Major chord. <span>{activeShapeName}</span>{" "}
        will expose the following colors of it:
      </>
    ),
    phDominant: (
      <>
        In the key of <span>{key}</span>, a sense of tension to{" "}
        <span>{key.split("/")[1].replace("m", "")} Minor</span> chord may be
        provided by the <span>{majorRootName}</span> Major chord.{" "}
        <span>{activeShapeName}</span> will expose the following colors of it:
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

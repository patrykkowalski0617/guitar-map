import { useStore } from "../../store/useStore";

const Description = ({ majorRootName, minorRootName, activeShapeName }) => {
  const { activeMusicContext, tuneKey } = useStore();

  const key = tuneKey.label;
  const id = activeMusicContext.id;

  const descriptions = {
    tonic: (
      <>
        In the key of <span>{key}</span>, a sense of resolution may be provided
        by the <span>{majorRootName}&nbsp;Major</span> or{" "}
        <span>{minorRootName}&nbsp;Minor</span> chord.{" "}
        <span>{activeShapeName} Set</span> will expose the following colors of
        each:
      </>
    ),

    subdominant: (
      <>
        In the key of <span>{key}</span>, a sense of motion may be provided by
        the <span>{majorRootName}&nbsp;Major</span> or{" "}
        <span>{minorRootName}&nbsp;Minor</span> chord.{" "}
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

  return (
    <>
      {id === "tonics"
        ? descriptions.tonic
        : id === "subdominants"
        ? descriptions.subdominant
        : id === "dominant"
        ? descriptions.dominant
        : id === "dominant-ph"
        ? descriptions.phDominant
        : ""}
    </>
  );
};

export default Description;

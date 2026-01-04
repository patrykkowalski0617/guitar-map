import { useStore } from "../../../store/useStore";
import * as S from "./parts";

export const DescriptionText = ({
  majorRootName,
  minorRootName,
  activeShapeName,
  fullProfileJSX,
}) => {
  const { activeMusicContext, tuneKey } = useStore();
  const key = tuneKey.label;
  const id = activeMusicContext.id;

  const descriptions = {
    tonic: (
      <>
        In the key of <S.MarkedText>{key}</S.MarkedText>, a sense of resolution
        may be provided by the{" "}
        <S.MarkedText>{majorRootName}&nbsp;Major</S.MarkedText> or{" "}
        <S.MarkedText>{minorRootName}&nbsp;Minor</S.MarkedText> chord. Function
        of those is called "Tonic".{" "}
        <S.MarkedText>{activeShapeName} Set</S.MarkedText> will expose{" "}
        {fullProfileJSX}.
      </>
    ),
    subdominant: (
      <>
        In the key of <S.MarkedText>{key}</S.MarkedText>, a sense of motion may
        be provided by the{" "}
        <S.MarkedText>{majorRootName}&nbsp;Major</S.MarkedText> or{" "}
        <S.MarkedText>{minorRootName}&nbsp;Minor</S.MarkedText> chord. Function
        of those is called "Subdominant".{" "}
        <S.MarkedText>{activeShapeName} Set</S.MarkedText> will expose{" "}
        {fullProfileJSX}.
      </>
    ),
    dominant: (
      <>
        In the key of <S.MarkedText>{key}</S.MarkedText>, a sense of tension to{" "}
        <S.MarkedText>{key.split("/")[0]} Major</S.MarkedText> Tonic may be
        provided by the <S.MarkedText>{majorRootName}&nbsp;Major</S.MarkedText>{" "}
        chord. Function of it is called "Dominant".{" "}
        <S.MarkedText>{activeShapeName}</S.MarkedText> Set will expose{" "}
        {fullProfileJSX}.
      </>
    ),
    phDominant: (
      <>
        In the key of <S.MarkedText>{key}</S.MarkedText>, a sense of tension to{" "}
        <S.MarkedText>{key.split("/")[1]?.replace("m", "")} Minor</S.MarkedText>{" "}
        Tonic may be provided by the{" "}
        <S.MarkedText>{majorRootName}&nbsp;Major</S.MarkedText> chord. Function
        of it is called "Dominant".{" "}
        <S.MarkedText>{activeShapeName} Set</S.MarkedText> will expose{" "}
        {fullProfileJSX}.
      </>
    ),
  };

  return (
    <S.DescriptionText>
      {id === "tonics"
        ? descriptions.tonic
        : id === "subdominants"
        ? descriptions.subdominant
        : id === "dominant"
        ? descriptions.dominant
        : id === "dominant-ph"
        ? descriptions.phDominant
        : ""}
    </S.DescriptionText>
  );
};

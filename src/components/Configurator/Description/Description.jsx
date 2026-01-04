import { useStore } from "../../../store/useStore";
import * as S from "./parts";

const INTERVALS = [1, 3, 5, 7, 9, 11, 13];

// --- STYLES ---

// --- COMPONENT: DESCRIPTION ---
const DescriptionText = ({
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
        <S.MarkedText>{minorRootName}&nbsp;Minor</S.MarkedText> chord.{" "}
        <S.MarkedText>{activeShapeName} Set</S.MarkedText> will expose{" "}
        {fullProfileJSX}
      </>
    ),
    subdominant: (
      <>
        In the key of <S.MarkedText>{key}</S.MarkedText>, a sense of motion may
        be provided by the{" "}
        <S.MarkedText>{majorRootName}&nbsp;Major</S.MarkedText> or{" "}
        <S.MarkedText>{minorRootName}&nbsp;Minor</S.MarkedText> chord.{" "}
        <S.MarkedText>{activeShapeName} Set</S.MarkedText> will expose{" "}
        {fullProfileJSX}
      </>
    ),
    dominant: (
      <>
        In the key of <S.MarkedText>{key}</S.MarkedText>, a sense of tension to{" "}
        <S.MarkedText>{key.split("/")[0]} Major</S.MarkedText> chord may be
        provided by the <S.MarkedText>{majorRootName}&nbsp;Major</S.MarkedText>{" "}
        chord. <S.MarkedText>{activeShapeName}</S.MarkedText> Set will expose{" "}
        {fullProfileJSX}
      </>
    ),
    phDominant: (
      <>
        In the key of <S.MarkedText>{key}</S.MarkedText>, a sense of tension to{" "}
        <S.MarkedText>{key.split("/")[1]?.replace("m", "")} Minor</S.MarkedText>{" "}
        chord may be provided by the{" "}
        <S.MarkedText>{majorRootName}&nbsp;Major</S.MarkedText> chord.{" "}
        <S.MarkedText>{activeShapeName} Set</S.MarkedText> will expose{" "}
        {fullProfileJSX}
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

// --- MAIN VISUALIZER ---
const Description = () => {
  const store = useStore();
  const {
    activeShape,
    activeMusicContext,
    getNoteNameByOffset,
    getActiveShapeName,
  } = store;

  if (!activeShape?.colorProfile || !activeMusicContext) return null;

  const profiles = [
    {
      data: activeShape.colorProfile.major,
      root: getNoteNameByOffset(activeMusicContext.majorRoot),
      type: "Major",
    },
    {
      data: activeShape.colorProfile.minor,
      root: getNoteNameByOffset(activeMusicContext.minorRoot),
      type: "Minor",
    },
  ].filter((p) => p.data);

  const getIntervalState = (profile, interval) => {
    const check = (arr) =>
      arr?.some((t) => (Array.isArray(t) ? t[0] === interval : t === interval));
    const isAltered = check(profile?.alteredTones);
    return {
      isActive:
        profile?.exposedTone === interval ||
        check(profile?.usedTones) ||
        isAltered,
      isAltered,
      isAvoid: profile?.avoidNotes?.includes(interval),
    };
  };

  const renderedProfiles = profiles.map(({ data, root, type }) => {
    const activeTones = INTERVALS.reduce((acc, interval) => {
      const state = getIntervalState(data, interval);
      if (state.isActive) acc.push({ interval, ...state });
      return acc;
    }, []);

    return (
      <span key={type}>
        {activeTones.map(({ interval, isAltered, isAvoid }, idx) => (
          <span key={interval}>
            <S.IntervalNumber
              $interval={interval}
              $isAltered={isAltered}
              $isAvoid={isAvoid}
            >
              {interval}
              {isAltered ? "alt" : ""}
            </S.IntervalNumber>
            {idx < activeTones.length - 1 && ", "}
          </span>
        ))}
        &nbsp;of{" "}
        <S.MarkedText>
          {root} {type}
        </S.MarkedText>
      </span>
    );
  });

  const combinedJSX = renderedProfiles.map((jsx, idx) => (
    <span key={idx}>
      {jsx}
      {idx < renderedProfiles.length - 1 && " and "}
    </span>
  ));

  return (
    <S.DescriptionWrapper>
      <DescriptionText
        majorRootName={profiles[0].root}
        minorRootName={profiles[1]?.root}
        activeShapeName={getActiveShapeName()}
        fullProfileJSX={combinedJSX}
      />
    </S.DescriptionWrapper>
  );
};

export default Description;

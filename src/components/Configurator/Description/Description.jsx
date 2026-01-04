import { SubsectionTitle } from "../../../parts";
import { useStore } from "../../../store/useStore";
import { DescriptionText } from "./DescriptionText";
import * as S from "./parts";

const INTERVALS = [1, 3, 5, 7, 9, 11, 13];

const Description = () => {
  const store = useStore();
  const {
    activeShape,
    activeMusicContext,
    getNoteNameByOffset,
    getActiveShapeName,
    getActiveChordGroup,
  } = store;

  if (!activeShape?.colorProfile || !activeMusicContext) return null;

  const shapeType = getActiveChordGroup().type;

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
    <>
      <SubsectionTitle>Description</SubsectionTitle>
      <DescriptionText
        majorRootName={profiles[0].root}
        minorRootName={profiles[1]?.root}
        activeShapeName={getActiveShapeName()}
        fullProfileJSX={combinedJSX}
        shapeType={shapeType}
      />
    </>
  );
};

export default Description;

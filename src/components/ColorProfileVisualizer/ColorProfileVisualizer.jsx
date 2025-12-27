import { useStore } from "../../store/useStore";
import ProfileRow from "./ProfileRow";
import * as S from "./parts";
import { SubsectionTitle } from "../../parts";

const ColorProfileVisualizer = () => {
  const activeShape = useStore((state) => state.activeShape);
  const activeMusicContext = useStore((state) => state.activeMusicContext);
  const getNoteNameByOffset = useStore((state) => state.getNoteNameByOffset);

  if (!activeShape?.colorProfile || !activeMusicContext) return null;

  const majorRootName = getNoteNameByOffset(activeMusicContext.majorRoot);
  const minorRootName = getNoteNameByOffset(activeMusicContext.minorRoot);

  return (
    <>
      <SubsectionTitle>Set Of Feeling</SubsectionTitle>
      <S.VisualizerContainer>
        <ProfileRow
          label="Major"
          profile={activeShape.colorProfile.major}
          rootNoteName={majorRootName}
        />
        {activeShape.colorProfile.minor && (
          <ProfileRow
            label="Minor"
            profile={activeShape.colorProfile.minor}
            rootNoteName={minorRootName}
          />
        )}
      </S.VisualizerContainer>
    </>
  );
};

export default ColorProfileVisualizer;

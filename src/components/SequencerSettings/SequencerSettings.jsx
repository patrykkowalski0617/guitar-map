import { useEffect, useState } from "react";
import { SEQUENCER_PATTERNS } from "../../data";
import { useStore } from "../../store/useStore";
import { SubSectionContainer } from "../../parts";
import {
  Label,
  SettingGroup,
  SettingsContainer,
  StyledRange,
  StyledSelect,
  RangeWrapper,
  SequencerButton,
} from "./parts";
import ScrollFader from "../ScrollFader/ScrollFader";

const SequencerSettings = ({ lockedCAGEDLetter }) => {
  const seqConfig = useStore((state) => state.seqConfig);
  const setSeqConfig = useStore((state) => state.setSeqConfig);
  const shape = useStore((state) => state.shape);

  const initialBpm = Math.round(60000 / (seqConfig?.interval || 500));

  const [displayBpm, setDisplayBpm] = useState(initialBpm);

  const patternKeys = Object.keys(SEQUENCER_PATTERNS);
  const isRunning = seqConfig?.isRunning || false;
  const isLocked = !shape || shape.length === 0 || lockedCAGEDLetter === null;

  useEffect(() => {
    if (isRunning) {
      setSeqConfig({ ...seqConfig, isRunning: false });
    }
  }, [shape]);

  const toggleSequencer = () => {
    if (isLocked) return;
    setSeqConfig({ ...seqConfig, isRunning: !isRunning });
  };

  const handlePatternChange = (e) => {
    setSeqConfig({ ...seqConfig, activePattern: e.target.value });
  };

  const handleBpmChange = (e) => {
    const newBpm = parseInt(e.target.value, 10);

    setDisplayBpm(newBpm);

    const newInterval = Math.round(60000 / newBpm);
    setSeqConfig({ ...seqConfig, interval: newInterval });
  };

  return (
    <ScrollFader>
      {" "}
      <SubSectionContainer>
        <SettingsContainer>
          <SettingGroup>
            <Label>Pattern</Label>
            <StyledSelect
              value={seqConfig?.activePattern || "linear"}
              onChange={handlePatternChange}
            >
              {patternKeys.map((key) => (
                <option key={key} value={key}>
                  {key.toUpperCase()}
                </option>
              ))}
            </StyledSelect>
          </SettingGroup>

          <SettingGroup>
            <Label>
              Tempo <span>{displayBpm} BPM</span>
            </Label>
            <RangeWrapper>
              <StyledRange
                type="range"
                min="30"
                max="300"
                step="2"
                value={displayBpm}
                onChange={handleBpmChange}
              />
            </RangeWrapper>
          </SettingGroup>

          <SettingGroup>
            <SequencerButton
              $active={isRunning}
              $isLocked={isLocked}
              onClick={toggleSequencer}
              disabled={isLocked}
            >
              {isLocked ? "SELECT SHAPE" : isRunning ? "STOP" : "START SEQ"}
            </SequencerButton>
          </SettingGroup>
        </SettingsContainer>
      </SubSectionContainer>
    </ScrollFader>
  );
};

export default SequencerSettings;

import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import alarm1 from "../../../public/alarm1.mp3";

// --- STYLED COMPONENTS ---

const TimerContainer = styled.div`
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 300px;
  position: fixed;
  z-index: 9;
  right: 35px;
  top: 10px;
  background: #121212dd;
  color: white;
`;

const InputWrapper = styled.div`
  margin-bottom: 5px;
`;

const TimerInput = styled.input`
  font-size: 2rem;
  text-align: center;
  width: 100%;
  border: none;
  background: transparent;
  color: ${(props) => (props.$isAlarming ? "#ff4444" : "white")};
  font-family: monospace;
  outline: none;
  cursor: ${(props) => (props.disabled ? "default" : "text")};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const BaseButton = styled.button`
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

const StopButton = styled(BaseButton)`
  background-color: #ff4444;
  width: 100%;
`;

const ActionButton = styled(BaseButton)`
  background-color: ${(props) =>
    props.$variant === "pause" ? "#ffcc00" : "#4CAF50"};
  flex: 1;
`;

const ResetButton = styled(BaseButton)`
  background-color: #f44336;
  flex: 1;
`;

// --- LOGIKA KOMPONENTU ---

const workerCode = `
  let timer = null;
  self.onmessage = (e) => {
    if (e.data === 'START') {
      timer = setInterval(() => self.postMessage('TICK'), 1000);
    } else if (e.data === 'STOP') {
      clearInterval(timer);
    }
  };
`;

const RobustTimer = ({ alarmSrc }) => {
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isAlarming, setIsAlarming] = useState(false);
  const [inputValue, setInputValue] = useState("45:00");
  const [nextMode, setNextMode] = useState(15);

  const workerRef = useRef(null);
  const audioRef = useRef(null);
  const handleAlarmRef = useRef(null);
  const inputRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const originalTitleRef = useRef("");

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    originalTitleRef.current = document.title || "Timer";
  }, []);

  const stopTitleScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    document.title = originalTitleRef.current;
  }, []);

  const startTitleScroll = useCallback(() => {
    stopTitleScroll();
    let titleText = " >>> KONIEC CZASU! <<<    ";
    scrollIntervalRef.current = setInterval(() => {
      titleText = titleText.substring(1) + titleText.substring(0, 1);
      document.title = titleText;
    }, 150);
  }, [stopTitleScroll]);

  // 1. Aktualizacja tytułu karty (browser tab title)
  useEffect(() => {
    if (isActive && !isAlarming) {
      const mins = Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, "0");
      const secs = (secondsLeft % 60).toString().padStart(2, "0");
      document.title = `${mins}:${secs} | ${originalTitleRef.current}`;
    }
  }, [secondsLeft, isActive, isAlarming]);

  // 2. PRZYWRÓCONE: Aktualizacja pola input w trakcie odliczania
  useEffect(() => {
    if (!isActive) return;
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    setInputValue(
      `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    );
  }, [secondsLeft, isActive]);

  const handleInputChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    let formatted = val;
    if (val.length >= 3) {
      formatted =
        val.slice(0, val.length - 2) + ":" + val.slice(val.length - 2);
    } else if (val.length > 0) {
      formatted = val;
    }
    setInputValue(formatted);
  };

  const stopTimer = useCallback(() => {
    setIsActive(false);
    if (workerRef.current) workerRef.current.postMessage("STOP");
    stopTitleScroll();
  }, [stopTitleScroll]);

  const resetToNextValue = useCallback(() => {
    stopTimer();
    setIsAlarming(false);
    stopTitleScroll();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const timeToSet = nextMode;
    setSecondsLeft(timeToSet * 60);
    setInputValue(`${timeToSet.toString().padStart(2, "0")}:00`);
    setNextMode(timeToSet === 45 ? 15 : 45);
  }, [nextMode, stopTimer, stopTitleScroll]);

  const handleAlarm = useCallback(() => {
    setIsActive(false);
    if (workerRef.current) workerRef.current.postMessage("STOP");
    setIsAlarming(true);

    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.error("Audio error:", e));
    }

    startTitleScroll();

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("KONIEC CZASU!", {
        body: `Kliknij STOP, aby przygotować ${nextMode} min.`,
        tag: "timer-alarm",
        requireInteraction: true,
      });
    }
  }, [nextMode, startTitleScroll]);

  const startTimer = useCallback(() => {
    setIsAlarming(false);
    stopTitleScroll();
    if (audioRef.current) audioRef.current.load();

    const parts = inputValue.split(":");
    let totalSec =
      parts.length === 2
        ? (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 0)
        : (parseInt(parts[0], 10) || 0) * 60;

    if (isNaN(totalSec) || totalSec <= 0) return;
    if (inputRef.current) inputRef.current.blur();

    setSecondsLeft(totalSec);
    setIsActive(true);
    workerRef.current.postMessage("START");
  }, [inputValue, stopTitleScroll]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isActive && !isAlarming) startTimer();
  };

  useEffect(() => {
    handleAlarmRef.current = handleAlarm;
  });

  useEffect(() => {
    const blob = new Blob([workerCode], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;
    worker.onmessage = () => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (handleAlarmRef.current) handleAlarmRef.current();
          return 0;
        }
        return prev - 1;
      });
    };
    return () => worker.terminate();
  }, []);

  return (
    <TimerContainer>
      <audio ref={audioRef} src={alarmSrc || alarm1} preload="auto" loop />

      <InputWrapper>
        <TimerInput
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()}
          onKeyDown={handleKeyDown}
          disabled={isActive || isAlarming}
          $isAlarming={isAlarming}
        />
      </InputWrapper>

      <ButtonGroup>
        {isAlarming ? (
          <StopButton onClick={resetToNextValue}>STOP ({nextMode}m)</StopButton>
        ) : (
          <>
            <ActionButton
              onClick={isActive ? stopTimer : startTimer}
              $variant={isActive ? "pause" : "start"}
            >
              {isActive ? "Pause" : "Start"}
            </ActionButton>
            <ResetButton onClick={resetToNextValue}>
              Reset ({nextMode}m)
            </ResetButton>
          </>
        )}
      </ButtonGroup>
    </TimerContainer>
  );
};

export default RobustTimer;

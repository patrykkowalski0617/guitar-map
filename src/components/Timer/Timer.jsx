import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import alarm1 from "../../../public/alarm1.mp3";

// --- STYLED COMPONENTS (bez zmian) ---

const InputWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const TimerInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.lg};
  text-align: center;
  width: 100%;
  border: none;
  background: transparent;
  color: ${(props) =>
    props.$isAlarming ? props.theme.colors.alert : props.theme.colors.text};
  font-family: monospace;
  outline: none;
  cursor: ${(props) => (props.disabled ? "default" : "text")};
  transform: rotate(90deg) translate(65%, 35px);
  transition: 0.5s;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const UnifiedButton = styled.button`
  width: 100%;
  padding: 8px 2px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${({ theme }) => `${theme.colors.contrast}44`};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.75rem;
  transition: ${(props) => props.theme.transitions.default};
  white-space: nowrap;
  overflow: hidden;
  transition: 0.5s;
  opacity: 0;
  &:hover {
    background-color: ${({ theme }) => theme.colors.alert};
  }
`;

const TimerContainer = styled.div`
  padding: ${(props) => props.theme.spacing.sm};
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  width: 120px;
  position: fixed;
  z-index: 9;
  right: -75px;
  top: 50vh;
  transform: translateY(-50%);
  background: ${(props) => props.theme.colors.bgLight}dd;
  color: ${(props) => props.theme.colors.text};
  box-shadow: ${(props) => props.theme.shadows.panel};
  transition: 0.5s;
  &:hover {
    right: 5px;
    ${UnifiedButton} {
      opacity: 1;
    }
    ${TimerInput} {
      transform: rotate(0deg) translate(0, 0);
      font-size: ${(props) => props.theme.fontSize.md};
    }
  }
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
  // Zostawiamy stan tylko dla manualnej edycji
  const [manualInputValue, setManualInputValue] = useState(null);
  const [nextMode, setNextMode] = useState(15);

  const [counter, setCounter] = useState(() => {
    const saved = localStorage.getItem("timer_counter");
    return saved ? parseInt(saved, 10) : 0;
  });

  const workerRef = useRef(null);
  const audioRef = useRef(null);
  const handleAlarmRef = useRef(null);
  const inputRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const originalTitleRef = useRef("");

  // --- OBLICZANIE WARTOŚCI WYŚWIETLANEJ (Derived State) ---
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Jeśli timer działa, bierzemy czas z odliczania. Jeśli nie, bierzemy to co wpisał użytkownik.
  const displayValue = isActive
    ? formatTime(secondsLeft)
    : manualInputValue ?? formatTime(secondsLeft);

  useEffect(() => {
    localStorage.setItem("timer_counter", counter);
  }, [counter]);

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

  useEffect(() => {
    if (isActive && !isAlarming) {
      document.title = `${formatTime(secondsLeft)} | ${
        originalTitleRef.current
      }`;
    }
  }, [secondsLeft, isActive, isAlarming]);

  const handleInputChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    let formatted = val;
    if (val.length >= 3) {
      formatted =
        val.slice(0, val.length - 2) + ":" + val.slice(val.length - 2);
    }
    setManualInputValue(formatted);
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
    setManualInputValue(null); // Czyścimy manualny wpis
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

    // Używamy displayValue do ustalenia czasu startowego
    const parts = displayValue.split(":");
    let totalSec =
      parts.length === 2
        ? (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 0)
        : (parseInt(parts[0], 10) || 0) * 60;

    if (isNaN(totalSec) || totalSec <= 0) return;
    if (inputRef.current) inputRef.current.blur();

    setSecondsLeft(totalSec);
    setManualInputValue(null); // Powrót do synchronizacji z sekundami
    setIsActive(true);
    workerRef.current.postMessage("START");
  }, [displayValue, stopTitleScroll]);

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
          value={displayValue}
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) =>
            e.key === "Enter" && !isActive && !isAlarming && startTimer()
          }
          disabled={isActive || isAlarming}
          $isAlarming={isAlarming}
        />
      </InputWrapper>
      <ButtonGroup>
        {isAlarming ? (
          <UnifiedButton $isAlert onClick={resetToNextValue}>
            STOP ({nextMode}m)
          </UnifiedButton>
        ) : (
          <>
            <UnifiedButton onClick={isActive ? stopTimer : startTimer}>
              {isActive ? "Pause" : "Start"}
            </UnifiedButton>
            <UnifiedButton onClick={resetToNextValue}>
              Reset ({nextMode}m)
            </UnifiedButton>
          </>
        )}
        <UnifiedButton onClick={() => setCounter((c) => c + 1)}>
          C: {counter}
        </UnifiedButton>
        <UnifiedButton onClick={() => setCounter(0)}>C-Reset</UnifiedButton>
      </ButtonGroup>
    </TimerContainer>
  );
};

export default RobustTimer;

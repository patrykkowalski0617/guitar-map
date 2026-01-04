import { useState, useEffect, useRef, useCallback } from "react";
import alarm1 from "../../../public/alarm1.mp3";

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
  const originalTitleRef = useRef(document.title);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    originalTitleRef.current = document.title;
  }, []);

  const startTitleScroll = useCallback(() => {
    stopTitleScroll();
    let titleText = " >>> KONIEC CZASU! <<<    ";
    scrollIntervalRef.current = setInterval(() => {
      titleText = titleText.substring(1) + titleText.substring(0, 1);
      document.title = titleText;
    }, 150);
  }, []);

  const stopTitleScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    document.title = originalTitleRef.current;
  }, []);

  useEffect(() => {
    if (isActive && !isAlarming) {
      const mins = Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, "0");
      const secs = (secondsLeft % 60).toString().padStart(2, "0");
      document.title = `${mins}:${secs} | ${originalTitleRef.current}`;
    }
  }, [secondsLeft, isActive, isAlarming]);

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

  const handleFocus = (e) => e.target.select();

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
      audioRef.current.play().catch((e) => console.error("Błąd audio:", e));
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

  useEffect(() => {
    if (!isActive) return;
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    setInputValue(
      `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    );
  }, [secondsLeft, isActive]);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "300px",
        margin: "20px auto",
        position: "fixed",
        zIndex: "9",
        right: "35px",
        top: "10px",
        background: "#121212dd",
        color: "white",
      }}
    >
      <audio ref={audioRef} src={alarmSrc || alarm1} preload="auto" loop />

      <div style={{ marginBottom: "15px" }}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={isActive || isAlarming}
          style={{
            fontSize: "3rem",
            textAlign: "center",
            width: "100%",
            border: "none",
            background: "transparent",
            color: isAlarming ? "#ff4444" : "white",
            fontFamily: "monospace",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {isAlarming ? (
          <button
            onClick={resetToNextValue}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            STOP ({nextMode}m)
          </button>
        ) : (
          <>
            <button
              onClick={isActive ? stopTimer : startTimer}
              style={{
                padding: "10px 20px",
                backgroundColor: isActive ? "#ffcc00" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                flex: 1,
              }}
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button
              onClick={resetToNextValue}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                flex: 1,
              }}
            >
              Reset ({nextMode}m)
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RobustTimer;

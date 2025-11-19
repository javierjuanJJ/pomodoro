import React, { useState, useEffect } from "react";
import TimerDisplay from "./components/TimerDisplay";
import Controls from "./components/Controls";
import "./App.css";

export default function App() {
  const [mode, setMode] = useState("Work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (isRunning && timeLeft === 0) handleSessionEnd();
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSessionEnd = () => {
    new Audio("/beep.mp3").play();
    if (mode === "Work") {
      setSessionCount((s) => s + 1);
      if ((sessionCount + 1) % 4 === 0) {
        setMode("Long Break");
        setTimeLeft(15 * 60);
      } else {
        setMode("Short Break");
        setTimeLeft(5 * 60);
      }
    } else {
      setMode("Work");
      setTimeLeft(25 * 60);
    }
  };

  return (
    <div className="app">
      <h1>Pomodoro Timer</h1>
      <h2>{mode}</h2>
      <TimerDisplay timeLeft={timeLeft} />
      <Controls
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={() => setTimeLeft(25 * 60)}
      />
      <p>Completed Sessions: {sessionCount}</p>
    </div>
  );
}
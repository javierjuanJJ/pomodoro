import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="app">
      <h1>Pomodoro Timer</h1>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="controls">
        {!isRunning && timeLeft > 0 && (
          <button onClick={() => setIsRunning(true)}>Start</button>
        )}
        {isRunning && <button onClick={() => setIsRunning(false)}>Pause</button>}
        {!isRunning && timeLeft === 0 && (
          <button onClick={() => setTimeLeft(25 * 60)}>Reset</button>
        )}
      </div>
    </div>


  );
}
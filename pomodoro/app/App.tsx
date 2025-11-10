import React from "react";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <h1>Pomodoro Timer</h1>
      <div className="timer-display">25:00</div>
      <div className="controls">
        <button>Start</button>
        <button>Stop</button>
        <button>Resume</button>
      </div>
      <p>Session: Work</p>
    </div>
  );
}

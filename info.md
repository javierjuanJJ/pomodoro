# 🕒 Pomodoro Timer App — Guía paso a paso con código

## Pomodoro 1: Estructura base del proyecto

**Objetivo:** Crear la estructura inicial del proyecto y el temporizador visual.

```bash
npx create-react-app pomodoro-timer
cd pomodoro-timer
npm start


src/App.jsx

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


src/App.css

.app {
  text-align: center;
  font-family: sans-serif;
  background: #fdf6ec;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.timer-display {
  font-size: 4rem;
  margin: 20px 0;
}

button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #ff6f61;
  color: white;
  cursor: pointer;
}

Pomodoro 2: Lógica del temporizador básico

Objetivo: Contar hacia atrás desde 25 minutos.

src/App.jsx

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
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Stop</button>
      </div>
    </div>
  );
}

Pomodoro 3: Pausar y reanudar

Objetivo: Añadir funciones Pause y Resume.

<div className="controls">
  {!isRunning && timeLeft > 0 && (
    <button onClick={() => setIsRunning(true)}>Start</button>
  )}
  {isRunning && <button onClick={() => setIsRunning(false)}>Pause</button>}
  {!isRunning && timeLeft === 0 && (
    <button onClick={() => setTimeLeft(25 * 60)}>Reset</button>
  )}
</div>

Pomodoro 4: Configuración de intervalos y cambio de sesión

Objetivo: Cambiar entre trabajo, descanso corto y largo.

import React, { useState, useEffect } from "react";
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
    } else if (isRunning && timeLeft === 0) {
      handleSessionEnd();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSessionEnd = () => {
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

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="app">
      <h1>Pomodoro Timer</h1>
      <h2>{mode}</h2>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="controls">
        {isRunning ? (
          <button onClick={() => setIsRunning(false)}>Pause</button>
        ) : (
          <button onClick={() => setIsRunning(true)}>Start</button>
        )}
        <button onClick={() => setTimeLeft(25 * 60)}>Reset</button>
      </div>
      <p>Completed Sessions: {sessionCount}</p>
    </div>
  );
}

Pomodoro 5: Sonido al finalizar sesión

Objetivo: Añadir notificación sonora.

public/beep.mp3 → añade un sonido corto.

const handleSessionEnd = () => {
  new Audio("/beep.mp3").play();
  // ... resto del código igual
};

Pomodoro 6: Accesibilidad y diseño responsive
button:focus {
  outline: 3px solid #333;
}

@media (max-width: 600px) {
  .timer-display {
    font-size: 3rem;
  }
}

<button aria-label="Start timer" onClick={() => setIsRunning(true)}>Start</button>

Pomodoro 7: Modularización y limpieza

Crea componentes en src/components:

src/components/TimerDisplay.jsx

export default function TimerDisplay({ timeLeft }) {
  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  return <div className="timer-display">{formatTime(timeLeft)}</div>;
}


src/components/Controls.jsx

export default function Controls({ isRunning, onStart, onPause, onReset }) {
  return (
    <div className="controls">
      {isRunning ? (
        <button onClick={onPause}>Pause</button>
      ) : (
        <button onClick={onStart}>Start</button>
      )}
      <button onClick={onReset}>Reset</button>
    </div>
  );
}


src/App.jsx

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

Pomodoro 8: Despliegue y README

Despliegue en Vercel

npm run build
vercel deploy


README.md

# 🕒 Pomodoro Timer

Una aplicación simple basada en la Técnica Pomodoro.

## 🚀 Funcionalidades
- Iniciar, pausar y resetear el temporizador
- Cambios automáticos de sesión
- Sonido al finalizar
- Responsive y accesible

## 🔧 Tecnologías
- React + Hooks
- CSS Responsive
- Deploy en Vercel


✅ Listo para copiar, pegar y ejecutar.
¿Deseas que te lo empaquete todo en un solo archivo .zip o .md descargable?
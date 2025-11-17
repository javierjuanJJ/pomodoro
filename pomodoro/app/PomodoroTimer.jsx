import { useState, useEffect, useRef } from "react";

export default function PomodoroTimer() {
  // Configuraciones por defecto
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60);
  const [longBreakDuration, setLongBreakDuration] = useState(15 * 60);

  // Estado del timer
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);

  // Sesiones
  const [sessionType, setSessionType] = useState("Work"); // Work | Short Break | Long Break
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);

  const intervalRef = useRef(null);

  // Formatear tiempo mm:ss
  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Iniciar
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
  };

  // Pausar
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Reset
  const resetTimer = () => {
    pauseTimer();
    if (sessionType === "Work") setTimeLeft(workDuration);
    if (sessionType === "Short Break") setTimeLeft(shortBreakDuration);
    if (sessionType === "Long Break") setTimeLeft(longBreakDuration);
  };

  // Lógica para cambio de sesiones
  useEffect(() => {
    if (timeLeft === 0) {
      pauseTimer();

      if (sessionType === "Work") {
        const newCount = completedWorkSessions + 1;
        setCompletedWorkSessions(newCount);

        // Long Break después de 4 sesiones
        if (newCount % 4 === 0) {
          setSessionType("Long Break");
          setTimeLeft(longBreakDuration);
        } else {
          setSessionType("Short Break");
          setTimeLeft(shortBreakDuration);
        }
      } else {
        // Después de un descanso → volver a Work
        setSessionType("Work");
        setTimeLeft(workDuration);
      }
    }
  }, [timeLeft]);

  // Cuando cambian las configuraciones, actualizar Work
  useEffect(() => {
    if (sessionType === "Work") {
      setTimeLeft(workDuration);
    }
  }, [workDuration]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Pomodoro Timer</h2>
      
      <h3>Sesión actual: {sessionType}</h3>
      <h1>{formatTime()}</h1>

      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>

      <h4>Sesiones completadas: {completedWorkSessions}</h4>

      <div style={{ marginTop: "20px" }}>
        <h3>Configuración</h3>

        <label>
          Work (min):
          <input
            type="number"
            value={workDuration / 60}
            onChange={(e) => setWorkDuration(e.target.value * 60)}
          />
        </label>

        <br />

        <label>
          Short Break (min):
          <input
            type="number"
            value={shortBreakDuration / 60}
            onChange={(e) => setShortBreakDuration(e.target.value * 60)}
          />
        </label>

        <br />

        <label>
          Long Break (min):
          <input
            type="number"
            value={longBreakDuration / 60}
            onChange={(e) => setLongBreakDuration(e.target.value * 60)}
          />
        </label>
      </div>
    </div>
  );
}

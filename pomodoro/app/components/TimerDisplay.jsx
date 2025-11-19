export default function TimerDisplay({ timeLeft }) {
    const formatTime = (s) =>
        `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    return <div className="timer-display">{formatTime(timeLeft)}</div>;
}
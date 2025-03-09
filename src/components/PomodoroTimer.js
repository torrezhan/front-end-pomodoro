import React, { useState, useEffect, useRef } from "react";

const WORK_TIME = 1500;
const BREAK_TIME = 300;

const PomodoroTimer = ({ taskId }) => {
    const [time, setTime] = useState(WORK_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const workCompleteSound = useRef(new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'));
    const breakCompleteSound = useRef(new Audio('https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg'));

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    useEffect(() => {
        if (time === 0) {
            if (isBreak) {
                breakCompleteSound.current.play();
                setIsBreak(false);
                setTime(WORK_TIME);
            } else {
                workCompleteSound.current.play();
                setIsBreak(true);
                setTime(BREAK_TIME);
            }
            setIsRunning(false);
        }
    }, [time, isBreak]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleReset = () => {
        setTime(isBreak ? BREAK_TIME : WORK_TIME);
        setIsRunning(false);
    };

    return (
        <div className={`task-pomodoro ${isBreak ? 'break-mode' : ''}`}>
            <span title={isBreak ? "Break Time" : "Work Time"}>
                {formatTime(time)}
                {isBreak && <span className="break-indicator">🌟</span>}
            </span>
            <button className="timer-control" onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "⏸" : "▶️"}
            </button>
            <button className="timer-control" onClick={handleReset}>⏹</button>
        </div>
    );
};

export default PomodoroTimer;

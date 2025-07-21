import { useState, useEffect, useRef } from "react";

export default function Timer() {
    const [state, setState] = useState(false);
    const [count, setCount] = useState<number>(0);
    const [time, setTime] = useState(new Date());

    const timeRef = useRef<number | null>(null);
    const startRef = useRef<Date | null>(null);

    const maxTime = 5 * 60;

    const runningTime = (count: number) => {
        // const date = new Date(count * 1000);
        // return date.toISOString().substr(14, 5);
        const min = String(Math.floor(count / 60)).padStart(2, "0");
        const sec = String(count % 60).padStart(2, "0");
        return `${min}:${sec}`;
    };

    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      };

    console.log(timeRef);
    console.log(timeRef.current);
    console.log("state", state);


    useEffect(() => {
        if (state && maxTime > count) {
              timeRef.current = setInterval(() => {
                setCount((prev) => prev + 1);
                setTime(new Date());
              }, 1000);
        }
        return () => {
            if (timeRef.current) clearInterval(timeRef.current);
        };
    }, [state]);

    useEffect(() => {
        if (count === maxTime) {
            stopCounter();
        }
    }, [count]);

    const startCounter = () => {
        startRef.current = new Date();
        if (!state && count < maxTime) {
            setState(true);
        }
    };

    const stopCounter = () => {
        setState(false);
        if (timeRef.current) clearInterval(timeRef.current);
    };

    const resetCounter = () => {
        setCount(0);
        setState(false);
    };
    

    return (
        <div>
            <h1>Timer: {runningTime(count)}</h1>
            <h1>Current Time: {formatTime(time)}</h1>
            <button onClick={startCounter} disabled={state}>Start</button>
            <button onClick={stopCounter} disabled={!state}>Stop</button>
            <button onClick={resetCounter}>Reset</button>
        </div>
    );
}

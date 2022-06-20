import React, { useEffect, useState } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import { RefreshIcon } from "@heroicons/react/outline";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DisplayTimer from "./DisplayTimer";
import ChevronRight from "./ChevronRight";
import { ChevronLeft } from "./ChevronLeft";

const Pomodoro = () => {
  const [repeat, setRepeat] = useState(1);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [isTimerPaused, setIsTimerPaused] = useState(true);

  function getMode() {
    return isWorkMode ? "work" : "break";
  }

  function incrementRepeat() {
    if (repeat < 10) {
      setRepeat((repeat) => repeat + 1);
    }
  }

  function decrementRepeat() {
    if (repeat > 1) {
      setRepeat((repeat) => repeat - 1);
    }
  }

  function decrementTimer() {
    if (seconds === 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    } else if (minutes === 0) {
      setIsTimerPaused(true);
      setIsWorkMode(!isWorkMode);
      if (isWorkMode) {
        setIsWorkMode(!isWorkMode);
        setMinutes(25);
        setSeconds(0);
      } else if (!isWorkMode) {
        setMinutes(5);
        setSeconds(0);
      }
      setMinutes(25);
      setSeconds(0);
    } else {
      setSeconds((seconds) => seconds - 1);
    }
  }

  function resetTimer() {
    setMinutes(isWorkMode ? 25 : 5);
    setSeconds(0);
    if (!isTimerPaused) {
      setIsTimerPaused(true);
    }
  }

  function getTimeRemainingPercentage() {
    const totalTime = 25 * 60;
    const currentTime = minutes * 60 + seconds;
    return Math.ceil(totalTime / currentTime);
  }

  const iconWidth = "3rem";
  function displayPlayPauseButton() {
    return isTimerPaused ? (
      <PlayIcon width={iconWidth} color="#32cd32" />
    ) : (
      <PauseIcon width={iconWidth} color="#ff2400" />
    );
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!isTimerPaused && repeat >= 1) {
        decrementTimer();
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  });

  function resumeTimer() {
    setIsTimerPaused(!isTimerPaused);
  }

  return (
    <div className="container">
      <div className="progress-bar-container">
        <CircularProgressbarWithChildren
          styles={buildStyles({
            pathColor: "#FFA500",
            trailColor: "white",
          })}
          className="progress-bar"
          value={getTimeRemainingPercentage()}
          strokeWidth={3}
        >
          <div className="controls-container">
            <div>
              {
                <DisplayTimer
                  minutes={minutes}
                  seconds={seconds}
                  isTimerPaused={isTimerPaused}
                />
              }
            </div>
            <div className="work-mode">{getMode()}</div>
            <div className="controls">
              <button onClick={resumeTimer}>{displayPlayPauseButton()}</button>
              <button onClick={() => resumeTimer()}>
                <RefreshIcon
                  width={iconWidth}
                  color="gray"
                  onClick={() => resetTimer()}
                />
              </button>
            </div>
            <div className="repeat">
              {isTimerPaused && (
                <>
                  <span>Repeat</span>
                  <div>
                    <ChevronLeft onClickHandler={decrementRepeat} />
                    <span className="repeat-value">{repeat}</span>
                    <ChevronRight onClickHandler={incrementRepeat} />
                  </div>
                </>
              )}
            </div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default Pomodoro;

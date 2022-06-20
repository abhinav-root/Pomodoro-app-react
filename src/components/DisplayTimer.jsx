const DisplayTimer = ({ minutes, seconds }) => {
  const secs = seconds.toString().length === 1 ? `0${seconds}` : seconds;
  return <div className="timer">{`${minutes}:${secs}`}</div>;
};

export default DisplayTimer;

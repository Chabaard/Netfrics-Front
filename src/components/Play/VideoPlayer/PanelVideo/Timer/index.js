/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Timer({ videoRef, timer, dragTime }) {
  const time = (currentTimer) => {
    const newTimer = new Date();
    newTimer.setSeconds(currentTimer);
    newTimer.setMinutes(currentTimer / 60);
    newTimer.setHours(currentTimer / 60 / 60);
    if (newTimer.getHours() === 0) return newTimer.toLocaleTimeString().substring(3);
    return newTimer.toLocaleTimeString();
  };
  return (
    <div id="timer">{time(dragTime !== null ? dragTime : timer)} / {time(videoRef.current.duration)}</div>

  );
}
Timer.propTypes = {
  videoRef: PropTypes.any.isRequired,
  timer: PropTypes.number.isRequired,
  dragTime: PropTypes.number,
};
Timer.defaultProps = {
  dragTime: null,
};
// == Export
export default React.memo(Timer);

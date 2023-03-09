/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Bar({ videoRef, timer, dragTime, setDragTime, setTimer }) {
  const barRef = useRef();
  const progressRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  function setWidth() {
    return `${Math.floor(((dragTime !== null ? dragTime : timer) / videoRef.current.duration) * 100)}%`;
  }

  const setPos = (event) => {
    const rect = progressRef.current.getBoundingClientRect();
    const x = (event.clientX || event.touches[0].clientX) - rect.left;
    const time = (x / barRef.current.clientWidth) * videoRef.current.duration;
    // if mouse out of the right window set to video duration
    if (x > barRef.current.clientWidth) setDragTime(videoRef.current.duration);
    // if mouse is out of the left screen setTo 0
    else if (x < 0) setDragTime(0);
    // else all is ok we push to timer set
    else {
      setDragTime(time);
      setTimer(time);
    }
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
    if (dragTime === null) {
      setDragTime(null);
      setPos(event);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragTime !== null) {
      setTimer(dragTime);
      videoRef.current.currentTime = dragTime;
      setDragTime(null);
    }
  };

  const handleDragMove = (event) => {
    if (isDragging && progressRef.current) {
      setPos(event);
    }
  };

  useEffect(() => {
    window.addEventListener('pointermove', handleDragMove);
    window.addEventListener('pointerup', handleDragEnd);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('touchend', handleDragEnd);
    return () => {
      window.removeEventListener('pointermove', handleDragMove);
      window.removeEventListener('pointerup', handleDragEnd);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  });
  return (
    <div ref={barRef} id="bar" onMouseUp={handleMouseUp} onPointerDown={() => setIsDragging(true)}>
      <div ref={progressRef} id="progress" style={{ width: setWidth() }}>
        <div id="round" />
      </div>
    </div>
  );
}
Bar.propTypes = {
  videoRef: PropTypes.any.isRequired,
  setDragTime: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  setTimer: PropTypes.func.isRequired,
  dragTime: PropTypes.number,
};
Bar.defaultProps = {
  dragTime: null,
};
// == Export
export default React.memo(Bar);

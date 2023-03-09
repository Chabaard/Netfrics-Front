/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RiSkipBackFill, RiSkipForwardFill, RiRewindFill, RiSpeedFill } from 'react-icons/ri';
import Volume from './Buttons/Volume';
import Cast from './Buttons/Cast';
import Bar from './Bar';
import FullScreen from './Buttons/FullScreen';

import './styles.scss';
import PlayPause from './Buttons/PlayPause';
import Timer from './Timer';

function PanelVideo({ changeEp, videoRef, containerRef, path, timer, setTimer }) {
  const [dragTime, setDragTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(!videoRef.current.paused);

  function handlerTimer(time) {
    if (!videoRef.current.readyState === 4) return;

    if (time > 0) {
      if ((videoRef.current.currentTime + time) <= (videoRef.current.duration - 1)) {
        videoRef.current.currentTime += time;
      }
      else {
        videoRef.current.currentTime = videoRef.current.duration;
      }
    }
    if (time < 0) {
      if ((videoRef.current.currentTime + time) > 1) {
        videoRef.current.currentTime += time;
      }
      else {
        videoRef.current.currentTime = 0;
      }
    }
  }
  return (
    <>
      <div id="panel-top">
        <div id="btns">
          <RiSkipBackFill id="btn-skip-back" className="btn-player" onClick={() => changeEp(-1)} />
          <RiRewindFill id="btn-back-time" className="btn-player" onClick={() => handlerTimer(-30)} />
          <FullScreen containerRef={containerRef} />
          <RiSpeedFill id="btn-forward-time" className="btn-player" onClick={() => handlerTimer(30)} />
          <RiSkipForwardFill id="btn-skip-forward" className="btn-player" onClick={() => changeEp(1)} />
        </div>
      </div>
      <PlayPause videoRef={videoRef} timer={timer} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <div id="panel-bottom">
        <Bar {...{ videoRef, timer, setDragTime, dragTime, setTimer }} />
        <div id="btns">
          <div className="left">
            <PlayPause videoRef={videoRef} timer={timer} isPlaying={isPlaying} setIsPlaying={setIsPlaying} isBar />
            <Timer timer={timer} videoRef={videoRef} dragTime={dragTime} />
          </div>
          <div className="right">
            <Volume videoRef={videoRef} />
            <Cast videoRef={videoRef} path={path} />
          </div>

        </div>
      </div>
    </>
  );
}
PanelVideo.propTypes = {
  changeEp: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  videoRef: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  containerRef: PropTypes.object.isRequired,
};

// == Export
export default React.memo(PanelVideo);

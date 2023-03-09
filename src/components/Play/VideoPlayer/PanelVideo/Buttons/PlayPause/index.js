/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import React from 'react';
import PropTypes from 'prop-types';
import { RiPauseFill, RiPlayFill } from 'react-icons/ri';

import './styles.scss';

function PlayPause({ videoRef, isBar, timer, isPlaying, setIsPlaying }) {
  const handlerPanel = {
    play() {
      if (isPlaying) {
        videoRef.current.pause();
      }
      else {
        videoRef.current.currentTime = timer;
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    },
  };

  return (
    <>
      {isPlaying
        ? <RiPauseFill id="btn-pause" className={isBar ? 'bar' : 'center'} onClick={handlerPanel.play} />
        : <RiPlayFill id="btn-play" className={isBar ? 'bar' : 'center'} onClick={handlerPanel.play} />}
    </>
  );
}
PlayPause.propTypes = {
  videoRef: PropTypes.any.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  timer: PropTypes.number,
  isBar: PropTypes.bool,
};
PlayPause.defaultProps = {
  timer: 0,
  isBar: false,
};
// == Export
export default React.memo(PlayPause);

/* eslint-disable object-curly-newline */
/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import PanelVideo from './PanelVideo';
import Video from './Video';
import './styles.scss';
import Loader from '../../Loader';
import { VideoDataContext } from '../../../context/VideoDataContext';

function VideoPlayer({ id, path, poster, changeEp }) {
  const { timer, setTimer } = useContext(VideoDataContext);
  const [visible, setVisible] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const [videoRef, setVideoRef] = useState();
  const containerRef = useRef();

  useEffect(() => {
    let timeoutId;

    const handlePointerMove = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setVisible(false), 2500);
      setVisible(true);
    };

    const target = containerRef.current;
    target.addEventListener('pointerup', handlePointerMove);
    target.addEventListener('pointermove', handlePointerMove);
    return () => {
      clearTimeout(timeoutId);
      target.removeEventListener('pointerup', handlePointerMove);
      target.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);
  useEffect(() => {
    setIsLoad(false);
  }, [id]);

  return (
    <div ref={containerRef} id="container-video" className="container">
      <Video {...{ id, path, poster, setIsLoad, setTimer, setVideoRef }} />
      {isLoad ? '' : <Loader absolute />}
      {visible && isLoad ? (<PanelVideo {...{ changeEp: changeEp, videoRef, containerRef, path, timer, setTimer }} />) : '' }
      <button id="btn-finished" onClick={() => { changeEp(1); }} className="hidden" type="button"> Episode suivant ?</button>
    </div>
  );
}

VideoPlayer.propTypes = {
  path: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  seriesId: PropTypes.number,
  seasonsId: PropTypes.number,
  changeEp: PropTypes.func.isRequired,
};
VideoPlayer.defaultProps = {
  seasonsId: null,
  seriesId: null,
};

// == Export
export default React.memo(VideoPlayer);

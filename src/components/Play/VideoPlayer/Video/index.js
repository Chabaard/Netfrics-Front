/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React, { useRef, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { VideoDataContext } from '../../../../context/VideoDataContext';

function Video({ path, poster, setIsLoad, setTimer, setVideoRef }) {
  const { setVideoDuration, videoInfos, saveUserVideoData } = useContext(VideoDataContext);
  const videoRef = useRef();

  useEffect(() => {
    setVideoRef(videoRef);
  }, []);
  function canPlay() {
    setIsLoad(true);
    setVideoDuration({ ...videoInfos, duration: videoRef.current.duration });
  }
  function timeUpdate() {
    setTimer(videoRef.current.currentTime);
  }
  function notLoad() {
    setIsLoad(false);
  }

  window.onbeforeunload = async () => {
    await saveUserVideoData();
  };
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      id="video"
      ref={videoRef}
      onCanPlay={canPlay}
      onTimeUpdate={timeUpdate}
      onWaiting={notLoad}
      onSeeking={notLoad}
      onStalled={notLoad}
      poster={`http://192.168.1.11:5000/affiche/${poster}`}
      src={`${process.env.REACT_APP_API_URL}videos/${path}`}
    />
  );
}

Video.propTypes = {
  path: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  setIsLoad: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  setVideoRef: PropTypes.func.isRequired,
};

// == Export
export default React.memo(Video);

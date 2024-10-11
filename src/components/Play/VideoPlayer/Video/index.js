/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React, { useRef, useEffect, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { VideoDataContext } from '../../../../context/VideoDataContext';
import { UrlContext } from '../../../../context/UrlContext';

function Video({ path, poster, setIsLoad, setTimer, setVideoRef }) {
  const { url } = useContext(UrlContext);
  const { setVideoDuration, videoInfos, saveUserVideoData } = useContext(VideoDataContext);
  const videoRef = useRef();

  const [saveData, setSaveData] = useState(null);

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

  async function onPlay() {
    clearInterval(saveData);
    const interval = setInterval(async () => {
      await saveUserVideoData();
    }, 30000);
    setSaveData(interval);
  }

  async function onStopPlaying () {
    clearInterval(saveData)
  }
  window.onbeforeunload = async () => {
    await saveUserVideoData();
  };
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      id="video"
      ref={videoRef}
      onPlay={onPlay}
      onPause={onStopPlaying}
      onCanPlay={canPlay}
      onTimeUpdate={timeUpdate}
      onWaiting={notLoad}
      onSeeking={notLoad}
      onStalled={notLoad}
      poster={`${url}/affiche/${poster}`}
      src={`${url}/videos/${path}`}
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

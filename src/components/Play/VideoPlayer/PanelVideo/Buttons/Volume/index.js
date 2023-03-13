/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RiVolumeMuteFill, RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';
import { useCookies } from 'react-cookie';

import './styles.scss';

function Volume({ videoRef }) {
  const [cookies, setCookies, removeCookies] = useCookies(['volume', 'muted']);
  function initCookies() {
    if (!cookies.volume) setCookies('volume', videoRef.current.volume * 100);
  }
  initCookies();
  const [muted, setMuted] = useState(cookies.muted);
  const [volume, setVolume] = useState(cookies.volume);
  const [visiblity, setVisibility] = useState(false);

  const volumeLevel = (e) => {
    if (e.target.value === '0') {
      setMuted(true);
    }
    if (e.target.value > 0) {
      setMuted(false);
    }
    setVolume(e.target.value);
    setCookies('volume', e.target.value);
    videoRef.current.volume = 1 * (volume / 100);
  };

  const onClick = () => {
    const isMobile = /Mobi/.test(navigator.userAgent);
    if (isMobile) {
      setVisibility(!visiblity);
    }
    else {
      setMuted(!muted);
    }
  };

  const onMouseEnter = () => {
    setVisibility(true);
  };

  useEffect(() => {
    if (!muted) {
      setVolume(cookies.volume);
      videoRef.current.muted = false;
      removeCookies('muted');
    }
    else if (muted) {
      setVolume(0);
      videoRef.current.muted = true;
      setCookies('muted', true);
    }
  }, [muted]);

  return (
    <div id="audio">
      {visiblity
        ? (
          <input
            id="volume-level"
            type="range"
            min="0"
            max="100"
            value={volume}
            style={{ background: `linear-gradient(to right, orange 0%, orange ${volume}%, #fff ${volume}%, #fff 100%)` }}
            onChange={volumeLevel}
          />
        ) : ''}
      {
        muted
          ? <RiVolumeMuteFill onClick={onClick} onMouseEnter={onMouseEnter} className="btn-player audio" />
          : (
            Number(volume) !== 100
              ? <RiVolumeDownFill onClick={onClick} onMouseEnter={onMouseEnter} className="btn-player audio" />
              : <RiVolumeUpFill onClick={onClick} onMouseEnter={onMouseEnter} className="btn-player audio" />
          )
      }

    </div>
  );
}
Volume.propTypes = {
  videoRef: PropTypes.any.isRequired,
};

// == Export
export default React.memo(Volume);

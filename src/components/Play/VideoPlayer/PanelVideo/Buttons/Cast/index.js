/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RiCastLine } from 'react-icons/ri';

import './styles.scss';

function Cast({ videoRef, path }) {
  function sendMedia(castContext) {
    const mediaInfo = new chrome.cast.media.MediaInfo(`${process.env.REACT_APP_API_URL}videos/${path}`, 'video/mp4');
    const request = new chrome.cast.media.LoadRequest(mediaInfo);
    castContext.getCurrentSession().loadMedia(request);
  }
  function createSession() {
    console.log(chrome);
    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
    });
    castContext.requestSession().then(() => {
      console.log('Session created!');
      sendMedia(castContext);
    }).catch(error => {
      console.log('Error creating session:', error);
    });
  }
  return (
    <>
      {chrome.cast ? <RiCastLine onClick={createSession} onTouchEnd={createSession} className="btn-player" /> : <> </>}
    </>
  );
}
Cast.propTypes = {
  videoRef: PropTypes.any.isRequired,
};

// == Export
export default React.memo(Cast);

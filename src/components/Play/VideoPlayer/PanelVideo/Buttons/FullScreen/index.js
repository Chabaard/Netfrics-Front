/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RiFullscreenExitFill, RiFullscreenFill } from 'react-icons/ri';

import './styles.scss';

function FullScreen({ containerRef }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    if (isFullscreen) containerRef.current.webkitRequestFullscreen();
    else if (document.fullscreenElement) document.exitFullscreen();
  }, [isFullscreen]);
  return (
    <>
      {isFullscreen
        ? <RiFullscreenExitFill id="btn-backscreen" className="btn-player" onClick={() => setIsFullscreen(false)} />
        : <RiFullscreenFill id="btn-fullscreen" className="btn-player" onClick={() => setIsFullscreen(true)} />}
    </>
  );
}
FullScreen.propTypes = {
  containerRef: PropTypes.object.isRequired,
};

// == Export
export default React.memo(FullScreen);

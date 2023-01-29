/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function PanelVideo({ changeEp, handlerTimer }) {
  function fullscreen() {
    if (!document.fullscreenElement) document.getElementById('container-video').webkitRequestFullscreen();
  }
  function backscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
  }
  return (
    <div id="panel-btns" className="panel-btns hidden">
      <button className="btn-last" type="button" onClick={() => changeEp(-1)}> </button>
      <button className="btn-back-time" type="button" onClick={() => handlerTimer(-10)}> </button>
      <button className="btn-fullscreen" type="button" onClick={fullscreen}> </button>
      <button className="btn-backscreen" type="button" onClick={backscreen}> </button>
      <button className="btn-forward-time" type="button" onClick={() => handlerTimer(10)}> </button>
      <button className="btn-next" type="button" onClick={() => changeEp(1)}> </button>
    </div>
  );
}
PanelVideo.propTypes = {
  changeEp: PropTypes.func.isRequired,
  handlerTimer: PropTypes.func.isRequired,
};

// == Export
export default React.memo(PanelVideo);

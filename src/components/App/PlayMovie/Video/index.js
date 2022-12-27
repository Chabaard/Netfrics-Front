/* eslint-disable object-curly-newline */
/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { request } from '../../../../utils/request';
import PanelVideo from './PanelVideo';
import './styles.scss';

function Video({ id, path, poster, seriesId, seasonsId, number, changeEp, user }) {
  // const user = useSelector((state) => state.user);
  let videoData = null;
  let timer = null;
  let isEnd = false;
  const app = {
    btnFinished: null,
    video: null,
    panel: null,
    handlerPanel: {
      handlerVisibility() {
        if (app.video.paused) return;
        app.handlerPanel.setVisibility([app.panel], true);
        if (isEnd && app.handlerVideo.isItFinished()) {
          app.handlerPanel.setVisibility([app.btnFinished], true);
        }

        if (timer) clearTimeout(timer);
        timer = setTimeout(() => app.handlerPanel.setVisibility([app.panel, app.btnFinished], false), 2500);
      },
      setVisibility(elt, isVisible) {
        if (!elt) return;
        elt.forEach((el) => {
          const eltB = el.classList;
          if (isVisible && eltB.contains('hidden')) eltB.replace('hidden', 'visible');
          if (!isVisible && eltB.contains('visible')) eltB.replace('visible', 'hidden');
        });
      },
      handlerTimer(time) {
        if (!app.video.readyState === 4) return;

        if (time > 0) {
          if ((app.video.currentTime + time) <= (app.video.duration - 1)) {
            app.video.currentTime += time;
          }
          else {
            app.video.currentTime = app.video.duration;
          }
        }
        if (time < 0) {
          if ((app.video.currentTime + time) > 1) {
            app.video.currentTime += time;
          }
          else {
            app.video.currentTime = 0;
          }
        }
      },
      handlerBtnFinished() {
        if (app.btnFinished) {
          if (!isEnd && app.handlerVideo.isItFinished()) {
            app.handlerPanel.setVisibility([app.btnFinished], true);
            if (!timer) clearTimeout(timer);
            if (!app.video.paused) timer = setTimeout(() => app.handlerPanel.setVisibility([app.btnFinished], false), 5500);
          }
          else if (isEnd && !app.handlerVideo.isItFinished()) {
            app.handlerPanel.setVisibility([app.btnFinished], false);
          }
        }
      },
    },
    handlerVideo: {
      initEvent() {
        window.addEventListener('beforeunload', () => app.handlerVideo.saveUserVideoData(app.video));
        app.video.addEventListener('mousemove', app.handlerPanel.handlerVisibility);
        app.video.addEventListener('touchend', app.handlerPanel.handlerVisibility);
        app.video.addEventListener('pause', app.handlerVideo.pause);
        app.video.addEventListener('play', app.handlerVideo.play);
        app.video.addEventListener('timeupdate', app.handlerPanel.handlerBtnFinished);
      },
      async getUserVideoData() {
        videoData = await request.get(`movieviewed/${id}/${user.id}`);
        if (videoData && Math.round(app.video.currentTime) !== videoData.timer) {
          app.video.currentTime = videoData.timer;
        }
      },
      async pause(e) {
        app.handlerVideo.saveUserVideoData(e.target);
        app.handlerPanel.setVisibility([app.panel], true);
        app.handlerPanel.handlerBtnFinished();
        if (timer) clearTimeout(timer);
      },
      play(e) {
        app.handlerPanel.handlerVisibility(e);
      },
      isItFinished() {
        if (app.video.currentTime >= (app.video.duration - 120)) {
          isEnd = true;
          return true;
        }
        isEnd = false;
        return false;
      },
      async saveUserVideoData() {
        const actualTimer = app.video.currentTime;
        if (!videoData && actualTimer < 30) return;
        if (videoData && actualTimer > (videoData.timer - 20) && actualTimer < (videoData.timer + 20)) return;
        const data = {
          series_id: seriesId,
          seasons_id: seasonsId,
          users_id: user.id,
          episodes_id: id,
          timer: Math.round(actualTimer),
          finished: app.handlerVideo.isItFinished(),
        };
        await request.post('serieviewed', data, 'json');
      },
    },
  };
  useEffect(() => {
    try {
      app.video = document.getElementById('video');
      app.panel = document.getElementById('panel-btns');
      app.btnFinished = document.getElementById('btn-finished');
      app.handlerVideo.initEvent();
      app.handlerPanel.setVisibility([app.panel], true);
      app.handlerVideo.getUserVideoData();
    }
    catch (err) {
      console.log("Retourner l'erreur au dev", err);
    }
  }, []);

  return (
    <div id="container-video" className="container">
      <video id="video" data-number={number} className="video" controls poster={`http://192.168.1.11:5000/affiche/${poster}`} src={`http://192.168.1.11:5000/videos/${path}`} />
      <PanelVideo {...{ changeEp: changeEp, handlerTimer: app.handlerPanel.handlerTimer }} />
      <button id="btn-finished" onClick={() => { app.handlerVideo.saveUserVideoData(); changeEp(1); }} className="hidden" type="button"> Episode suivant ?</button>
    </div>
  );
}

Video.propTypes = {
  path: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  seriesId: PropTypes.number.isRequired,
  seasonsId: PropTypes.number.isRequired,
  changeEp: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

// == Export
export default React.memo(Video);

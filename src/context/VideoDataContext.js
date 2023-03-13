/* eslint-disable max-len */
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { request } from '../utils/request';

const VideoDataContext = createContext();

function VideoDataProvider({ children }) {
  const [cookies] = useCookies(['user']);
  const [timer, setTimer] = useState(0);
  const [videoInfos, setVideoInfos] = useState();
  const [userVideoData, setUserVideoData] = useState();
  const [videoDuration, setVideoDuration] = useState();

  function resetContext() {
    setVideoInfos(null);
    setUserVideoData(null);
    setTimer(0);
  }
  function isItFinished() {
    if (timer >= (videoDuration - 120)) {
      return true;
    }
    return false;
  }
  async function saveUserVideoData() {
    if (!userVideoData && timer < 30) return;
    // eslint-disable-next-line max-len
    if (userVideoData && timer > (userVideoData.timer - 20) && timer < (userVideoData.timer + 20)) return;
    const data = {
      users_id: cookies.user.id,
      timer: Math.round(timer),
      finished: isItFinished(),
    };
    switch (videoInfos.type) {
      case 'series':
        data.series_id = videoInfos.series_id;
        data.episodes_id = videoInfos.id;
        await request.post('serieviewed', data, 'json');
        break;
      case 'movies':
        data.movies_id = videoInfos.id;
        await request.post('movieviewed', data, 'json');
        break;
      default:
        console.log('no type found');
    }
  }
  async function getUserVideoData() {
    if (!videoInfos || !cookies.user) return;
    let data = null;
    switch (videoInfos.type) {
      case 'series':
        data = await request.get(`serieviewed/${videoInfos.id}/${cookies.user.id}`);
        if (data) {
          setUserVideoData(data);
          setTimer(data.timer);
        }
        break;
      case 'movies':
        data = await request.get(`movieviewed/${videoInfos.id}/${cookies.user.id}`);
        if (data) {
          setUserVideoData(data);
          setTimer(data.timer);
        }
        break;
      default:
        console.log('no type found', videoInfos);
    }
  }
  useEffect(() => {
    getUserVideoData();
  }, [videoInfos]);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values, object-curly-newline
    <VideoDataContext.Provider value={{ videoInfos, setVideoInfos, timer, setTimer, userVideoData, getUserVideoData, saveUserVideoData, setVideoDuration, resetContext }}>
      {children}
    </VideoDataContext.Provider>
  );
}
VideoDataProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
export { VideoDataContext, VideoDataProvider };

/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { request } from '../utils/request';
import { utils } from '../utils/utils';
import { useCookies } from 'react-cookie';


const VideoContext = createContext();

function VideoProvider({ children }) {
  const [isLoad, setIsLoad] = useState(false);
  const [cookies] = useCookies(['user']);
  
  const [families, setFamilies] = useState();
  const [onlyFamilies, setOnlyFamilies] = useState();

  const [userView, setUserView] = useState();
  const [onlyMovies, setOnlyMovies] = useState(false);
  const [onlySeries, setOnlySeries] = useState(false);
  
  async function addFavorites(type, id) {
    const data = { users_id: cookies.user.id };
    if (type === "series") data.series_id = id;
    else if (type === "movies") data.movies_id = id;
    else return 'no type found';

    await request.post('api/favorite', data, 'json');
    setIsLoad(false);
    updatesFamilies();
  }
  async function removeFavorites(type, id) {
    await request.delete(`api/favorite/${type}/${cookies.user.id}`, id);
    setIsLoad(false);
    updatesFamilies();
  }

  async function getRandomVideo() {
    const randomVideo = utils.getRandomVideo(await request.get(`videos/${cookies.user.id}`)); // [ {}, {}... ]
    return randomVideo;
  }

  async function updateUserViews() {
    const viewed = {
      name: 'Reprendre là où vous en entiez...',
    };
    viewed.series  = await request.get(`seriesviewed/${cookies.user.id}`);
    viewed.movies  = await request.get(`moviesviewed/${cookies.user.id}`);

    if (!viewed.movies && !viewed.series) {
      setUserView(null); 
      return null;
    }
    if (viewed.movies || viewed.series) setUserView(viewed);
    return viewed;
  }

  async function updatesFamilies() {
    try {
      const response = await request.get(`videos/${cookies.user.id}`);
      const viewedFamily = await updateUserViews(); // { name: string, movies: [], series: [] }
      const seriesFamily = utils.getSeries(await request.get(`videos/${cookies.user.id}`)); // { name: string, series: [] }
      setIsLoad(true);
      setOnlyFamilies([seriesFamily, ...response]);

      if (onlySeries) {
        if (viewedFamily) setFamilies([viewedFamily, ...response].filter((familie) => familie.series));
        else setFamilies([...response].filter((familie) => familie.series));
      }
      else if (onlyMovies) {
        if (viewedFamily) setFamilies([viewedFamily, ...response].filter((familie) => familie.movies));
        else setFamilies([...response].filter((familie) => familie.movies));
      }
      else {
        if (viewedFamily) setFamilies([viewedFamily, seriesFamily, ...response]);
        else setFamilies([seriesFamily, ...response]);
      }

    } catch (err) {
      console.log(err);
      return true;
    }
  }

  useEffect(() => {
    setIsLoad(false);
    setFamilies(null);
    updatesFamilies();
  }, [onlyMovies, onlySeries])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values, object-curly-newline
    <VideoContext.Provider value={{ updatesFamilies, families, userView, updateUserViews, setOnlySeries, setOnlyMovies, onlySeries, onlyMovies, isLoad, getRandomVideo, addFavorites, removeFavorites, onlyFamilies }}>
      {children}
    </VideoContext.Provider>
  );
}
VideoProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
export { VideoContext, VideoProvider };

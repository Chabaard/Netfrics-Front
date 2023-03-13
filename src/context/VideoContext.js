/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { request } from '../utils/request';
import { utils } from '../utils/utils';
import { useCookies } from 'react-cookie';

const VideoContext = createContext();

function VideoProvider({ children }) {
  const [cookies] = useCookies(['user']);
  const [families, setFamilies] = useState();
  const [moviesList, setMoviesList] = useState();
  const [movies, setMovies] = useState();
  const [series, setSeries] = useState();
  const [userView, setUserView] = useState();
  const [onlyMovies, setOnlyMovies] = useState(false);
  const [onlySeries, setOnlySeries] = useState(false);

  async function updateUserViews() {
    const viewed = {
      name: 'Reprendre là où vous en entiez...',
    };
    viewed.series  = await request.get(`seriesviewed/${cookies.user.id}`);
    viewed.movies  = await request.get(`moviesviewed/${cookies.user.id}`);

    if (viewed.movies || viewed.series) setUserView(viewed);
    return viewed;
  }

  async function updatesFamilies() {
    try {
      const response = await request.get('videos');
      const viewedFamily = await updateUserViews(); // { name: string, movies: [], series: [] }
      const seriesFamily = utils.getSeries(await request.get('videos')); // { name: string, series: [] }
      const MoviesFamilies = utils.getMoviesFamilies(await request.get('videos')); // [ {}, {}... ]

      setSeries(seriesFamily);
      setMovies(response);

      if (onlySeries) {
        setFamilies([viewedFamily, ...response].filter((familie) => familie.series));
      }
      else if (onlyMovies) {
        setFamilies([viewedFamily, ...response].filter((familie) => familie.movies));
      }
      else {
        setFamilies([viewedFamily, seriesFamily, ...response]);
      }

    } catch (err) {
      console.log(err);
      return true;
    }
  }

  useEffect(() => {
    updatesFamilies();
  }, [onlyMovies, onlySeries])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values, object-curly-newline
    <VideoContext.Provider value={{ updatesFamilies, families, series, movies, userView, updateUserViews, setOnlySeries, setOnlyMovies, onlySeries, onlyMovies }}>
      {children}
    </VideoContext.Provider>
  );
}
VideoProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
export { VideoContext, VideoProvider };

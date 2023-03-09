/* eslint-disable brace-style */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import Famille from '../../components/Famille';
import { request } from '../../utils/request';
import './styles.scss';
import { utils } from '../../utils/utils';
import Loader from '../../components/Loader';

function Accueil() {
  const [cookies] = useCookies(['user']);
  const [dataFamilies, setDataFamilies] = useState();
  const [userView, setUserView] = useState();
  const [isLoad, setIsLoad] = useState(false);

  function generateMovies() {
    return dataFamilies ? dataFamilies.map((famille) => (
      famille.series > 1 || famille.movies ? <Famille key={famille.name} {...famille} /> : ''
    )) : null;
  }
  function generateSeries() {
    const series = utils.getSeries(dataFamilies);
    return series.series[0] ? <Famille key={series.name} {...series} /> : null;
  }
  function generateViewed() {
    if (userView) return <Famille key={userView.name} {...userView} />;
    async function latestViewed() {
      const viewed = {
        name: 'Reprendre là où vous en entiez...',
      };
      viewed.movies = await request.get(`moviesviewed/${cookies.user.id}`);
      viewed.series = await request.get(`seriesviewed/${cookies.user.id}`);

      if (viewed.movies || viewed.series) setUserView(viewed);
    }
    latestViewed();
    return '';
  }
  useEffect(() => {
    async function getVideos() {
      try {
        const response = await request.get('videos');
        if (response) {
          setDataFamilies(response);
          setIsLoad(true);
        }
      }
      catch (err) {
        setIsLoad(true);
        console.log(err);
      }
    }
    getVideos();
  }, []);
  return (!isLoad ? <Loader />
    : (
      <div className="body">
        {generateViewed()}
        {generateSeries()}
        {generateMovies()}
      </div>
    )
  );
}

Accueil.propTypes = {
  path: PropTypes.string.isRequired,
};
// == Export
export default React.memo(Accueil);

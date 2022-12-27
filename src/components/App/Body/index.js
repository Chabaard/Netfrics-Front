/* eslint-disable brace-style */
/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Famille from './Famille';
import { request } from '../../../utils/request';
import './styles.scss';

function Body({ path }) {
  const user = useSelector((state) => state.user);
  const dataMovies = useSelector((state) => state.listMovies);
  const dataSeries = useSelector((state) => state.listSeries);
  const [viewed, setViewed] = useState();

  async function userViews() {
    const response = await request.get(`moviesviewed/${user.id}`);
    const responseSeries = await request.get(`seriesviewed/${user.id}`);
    if (response) response.forEach((element) => { element.type = 'movies'; });
    if (responseSeries) responseSeries.forEach((element) => { element.type = 'series'; });
    if (responseSeries && response) {
      switch (path) {
        case 'series':
          setViewed(responseSeries);
          break;
        case 'movies':
          setViewed(response);
          break;
        default:
          setViewed(response.concat(responseSeries));
          break;
      }
    }
  }
  useEffect(() => {
    userViews();
  }, [path]);
  return (
    <div className="body">
      { viewed ? (<Famille key="viewed" name="Reprendre là où vous en entiez..." data={viewed} />) : ''}
      { dataSeries && (path === 'all' || path === 'series') ? (<Famille key="series" name="Séries" data={dataSeries.series} {...{ type: 'series' }} />) : ''}
      { dataMovies && (path === 'all' || path === 'movies') ? dataMovies.map((famille) => (
        <Famille key={famille.name} name={famille.name} data={famille.films} {...{ type: 'movies' }} />
      )) : ''}
    </div>
  );
}

Body.propTypes = {
  path: PropTypes.string.isRequired,
};
// == Export
export default React.memo(Body);

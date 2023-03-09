import React from 'react';
import PropTypes from 'prop-types';
import Affiche from '../Affiche';
import './styles.scss';

function Famille({ movies, name, series }) {
  function jsxSeries() {
    return series.map((video) => (
      <Affiche key={video.id} {...video} type="series" />
    ));
  }
  function jsxMovies() {
    return movies.map((video) => (
      <Affiche key={video.id} {...video} type="movies" />
    ));
  }
  function getLength() {
    let length = 0;
    if (movies) length += movies.length;
    if (series) length += series.length;
    return length;
  }
  return (
    <div className={`famille ${getLength() >= 30 ? 'too-many' : ''}`}>
      <h2 className="famille-title">{ name }</h2>
      <div className={`famille-affiches ${getLength() >= 30 ? 'too-many-affiches' : ''}`}>
        {series ? jsxSeries() : ''}
        {movies ? jsxMovies() : ''}
      </div>
    </div>

  );
}

Famille.propTypes = {
  movies: PropTypes.array,
  name: PropTypes.string,
  series: PropTypes.array,
};
Famille.defaultProps = {
  series: null,
  movies: null,
  name: null,

};

// == Export
export default React.memo(Famille);

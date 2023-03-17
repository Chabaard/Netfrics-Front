import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Affiche from '../Affiche';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { VideoContext } from '../../context/VideoContext';

function Famille({ movies, name, series}) {
  const { id } = useParams();
  const { onlySeries, onlyMovies } = useContext(VideoContext);
  function getLength() {
    let length = 0;
    if (movies && !onlySeries) length += movies.length;
    if (series && !onlyMovies) length += series.length;
    return length;
  }
  return (
    // ${getLength() >= 30 && 'too-many'}
    <div className={`famille `}> 

      <h2 className="famille-title">{ name }</h2>
      {/* ${getLength() >= 30 && 'too-many-affiches'} */}
      <div className={`famille-affiches `}>

        {series && !onlyMovies && series.map((video) => (
          Number(video.id) !== Number(id) && <Affiche key={video.id} {...video} type="series" />
        ))}

        {movies && !onlySeries && movies.map((video) => (
          Number(video.id) !== Number(id) && <Affiche key={video.id} {...video} type="movies" />
        ))}

      </div>
    </div>

  );
}

Famille.propTypes = {
  movies: PropTypes.array,
  name: PropTypes.string.isRequired,
  series: PropTypes.array,
  onlyMovies: PropTypes.bool,
  onlySeries: PropTypes.bool,
};
Famille.defaultProps = {
  series: null,
  movies: null,
  onlyMovies: false,
  onlySeries: false,
};

// == Export
export default React.memo(Famille);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Affiche from './Affiche';
import './styles.scss';

function Famille({ data, name, type }) {
  return (
    <div className={`famille ${data.length > 30 ? 'too-many' : ''}`}>
      <h2 className="famille-title">{ name }</h2>
      <div className={`famille-affiches ${data.length > 30 ? 'too-many-affiches' : ''}`}>
        {data ? data.map((film) => (
          <Link key={film.name} to={`/${type || film.type}/${film.id}`}>
            <Affiche key={film.id} {...film} />
          </Link>
        )) : ''}
      </div>
    </div>
  );
}

Famille.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};
Famille.defaultProps = {
  type: null,
};

// == Export
export default React.memo(Famille);

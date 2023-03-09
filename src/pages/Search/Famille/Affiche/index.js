/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useNavigate, useParams } from 'react-router-dom';

function Affiche({ id, poster, type }) {
  const params = useParams();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/play/${type}/${id}`);
  };

  return (
    <>
      { Number(params.id) === Number(id)
        ? ''
        : (
          <div onClick={onClick} className="affiche">
            <img className="affiche" src={`http://192.168.1.11:5000/affiche/${poster}`} alt="movie" />
          </div>
        )}
    </>
  );
}

Affiche.propTypes = {
  poster: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

// == Export
export default React.memo(Affiche);

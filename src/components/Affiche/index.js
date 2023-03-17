/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { RiStarFill, RiStarLine } from 'react-icons/ri';
import { VideoContext } from '../../context/VideoContext';

function Affiche({ id, poster, type, favorites }) {
  const { addFavorites, removeFavorites } = useContext(VideoContext);
  const navigate = useNavigate();
  const [isFavorites, setIsFavorites] = useState(favorites);

  const onClickStar = () => {
    if (isFavorites) {
      removeFavorites(type, id); 
      setIsFavorites(false);
    }
    else {
      addFavorites(type, id); 
      setIsFavorites(true);
    }
  };

  const onClick = () => {
    navigate(`/play/${type}/${id}`);
  };

  return (
    <div className="container-picture affiche">
      {isFavorites ? <RiStarFill onClick={onClickStar} className="star" /> : <RiStarLine onClick={onClickStar} className="star" />}
      <svg className="svg-picture" onClick={onClick}  />
      <img className="no-download picture" src={`${process.env.REACT_APP_DATA_URL}affiche/${poster}`} alt="movie" />
    </div>
  );
}

Affiche.propTypes = {
  poster: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  favorites: PropTypes.bool.isRequired,
};

// == Export
export default React.memo(Affiche);

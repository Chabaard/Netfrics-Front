/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import './styles.scss';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

function Affiche({ id, poster, type }) {
  const navigate = useNavigate();
  const [isFavorites, setIsFavorites] = useState(false);

  const onClickStar = () => {
    setIsFavorites(!isFavorites);
  };

  const onClick = () => {
    // navigate(`/play/${type}/${id}`);
  };

  return (
    <div className="container-picture affiche">
      {isFavorites ? <RiStarFill onClick={onClickStar} className="star" /> : <RiStarLine onClick={onClickStar} className="star" />}
      <Link to={`/play/${type}/${id}`} state={{from: '/', replace: 'true'}} >  <svg className="svg-picture" onClick={onClick}  /> </Link>
      <img className="no-download picture" src={`${process.env.REACT_APP_DATA_URL}affiche/${poster}`} alt="movie" />
    </div>
  );
}

Affiche.propTypes = {
  poster: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

// == Export
export default React.memo(Affiche);

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { changePlayerMovie } from 'src/actions';

function Affiche({ id, poster, navigate }) {
  const [myImage, setMyImage] = useState('http://192.168.1.11:5000/affiche/');
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(changePlayerMovie(id));
  };
  useEffect(() => {
    setMyImage(myImage + poster);
  }, []);
  return (
    <div className="affiche">
      <img onClick={handleClick} className="affiche" src={myImage} alt="movie" />
      {navigate ? '' : ''}
    </div>
  );
}

Affiche.propTypes = {
  poster: PropTypes.string.isRequired,
  navigate: PropTypes.bool,
  id: PropTypes.number.isRequired,
};
Affiche.defaultProps = {
  navigate: false,
};
// == Export
export default React.memo(Affiche);

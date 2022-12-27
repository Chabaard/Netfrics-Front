/* eslint-disable brace-style */
import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { openModal } from '../../../utils/modal';
import './styles.scss';

function NavBar({ login, picture }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="links">
        <NavLink className={({ isActive }) => (isActive ? 'current' : '')} to="/accueil">
          <h2 className="link">Accueil</h2>
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? 'current' : '')} to="/films">
          <h2 className="link">Films</h2>
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? 'current' : '')} to="/series">
          <h2 className="link">Séries</h2>
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? 'current' : '')} to="/mangas">
          <h2 className="link">Mangas</h2>
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? 'current' : '')} to="/admin">
          <h2 className="link">Admin</h2>
        </NavLink>
      </div>
      <div className="profil" onClick={() => { openModal(dispatch); navigate('/'); }}>
        <div
          className="picture"
          style={picture ? { backgroundImage: `url("${process.env.REACT_APP_API_URL}img/profil/${picture}")` } : {}}
        />
        <div className="login"> {login} </div>
      </div>

    </div>
  );
}

NavBar.propTypes = {
  login: PropTypes.string,
  picture: PropTypes.string,
};
NavBar.defaultProps = {
  login: null,
  picture: null,
};
// == Export
export default React.memo(NavBar);

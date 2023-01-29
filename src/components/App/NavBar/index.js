/* eslint-disable brace-style */
import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { openModal } from '../../../utils/modal';
import './styles.scss';

function NavBar({ login, picture }) {
  console.log('navbar');
  const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['user']);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPanelAdmin = location.pathname.includes('/admin');

  return (
    <div className="navbar">
      <div className="links">
        <NavLink className="link" to="/accueil">
          Accueil
        </NavLink>
        { !isPanelAdmin ? (
          <>
            <NavLink className="link" to="/films">
              Films
            </NavLink>
            <NavLink className="link" to="/series">
              Séries
            </NavLink>
            <NavLink className="link" to="/mangas">
              Mangas
            </NavLink>
            <NavLink className="link" to="/admin/">
              Admin
            </NavLink>
          </>
        )
          : (
            <>
              <NavLink className="link" to="/admin/add">
                Add
              </NavLink>
              <NavLink className="link" to="/admin/update">
                Update
              </NavLink>
              <NavLink className="link" to="/admin/delete">
                Delete
              </NavLink>
            </>
          )}
      </div>
      <div className="profil" onClick={() => { removeCookieUser('user'); openModal(dispatch); navigate('/'); }}>
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

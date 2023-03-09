/* eslint-disable brace-style */
import React, { useContext } from 'react';

import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { RiSearchLine, RiMenuLine, RiArrowGoBackLine } from 'react-icons/ri';
import { SearchContext } from '../../context/SearchContext';

function NavBar({ login, picture }) {
  const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['user']);
  const location = useLocation();
  const navigate = useNavigate();
  const isPanelAdmin = location.pathname.includes('/admin');
  const { isSearch, setIsSearch, setSearchRequest } = useContext(SearchContext);

  const isMobile = /Mobi/.test(navigator.userAgent);

  return (
    <div className="navbar">
      { isSearch
        ? <><RiArrowGoBackLine className="btn" onClick={() => { setIsSearch(!isSearch); setSearchRequest(''); navigate('/'); }} /> <input className="input-text" type="text" onChange={(e) => setSearchRequest(e.target.value)} placeholder="Rechercher" /></>
        : (
          <>
            {!isMobile
              ? (
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
              )
              : <RiMenuLine onClick={() => { navigate('/'); }} className="btn" />}

            <RiSearchLine className="btn" onClick={() => { navigate('search'); setIsSearch(!isSearch);} } />

            <div className="profil" onClick={() => { removeCookieUser('user'); navigate('/'); }}>
              <div
                className="picture"
                style={picture ? { backgroundImage: `url("${process.env.REACT_APP_API_URL}img/profil/${picture}")` } : {}}
              />
              <div className="login"> {login} </div>
            </div>
          </>
        )
      }
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

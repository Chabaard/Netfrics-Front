/* eslint-disable brace-style */
import React, { useContext, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { RiSearchLine, RiArrowGoBackLine } from 'react-icons/ri';
import { SearchContext } from '../../context/SearchContext';
import Menu from './Menu';

function NavBar({ login, picture }) {
  const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['user']);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSearch, setIsSearch, setSearchRequest } = useContext(SearchContext);
  const searchBar = useRef();

  const isMobile = /Mobi/.test(navigator.userAgent);

  useEffect(() => {
    if (searchBar.current) {
      setIsSearch(true);
      searchBar.current.focus();
    }
  }, [location.pathname, isSearch]);
  useEffect(() => {
    if (location.pathname === '/search') {
      setIsSearch(true);
    }
  }, []);
  return (
    <div className="navbar">
      { isSearch
        ? <><RiArrowGoBackLine className="btn" onClick={() => { setIsSearch(!isSearch); setSearchRequest(''); navigate('/'); }} /> <input ref={searchBar} className="input-text" type="text" onChange={(e) => { setSearchRequest(e.target.value); }} placeholder="Rechercher" /></>
        : (
          <>
            <Menu />

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

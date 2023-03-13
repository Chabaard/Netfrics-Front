/* eslint-disable brace-style */
import React, { useContext, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiSearchLine, RiArrowGoBackLine } from 'react-icons/ri';
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';
import Menu from './Menu';
import './styles.scss';

function NavBar({ login, picture }) {
  const { removeUserCookie } = useContext(UserContext)
  const location = useLocation();
  const navigate = useNavigate();
  const { isSearch, setIsSearch, setSearchRequest } = useContext(SearchContext);
  const searchBar = useRef();

  useEffect(() => {
    if (searchBar.current) {
      setIsSearch(true);
      searchBar.current.focus();
    }
    if (location.pathname === '/search') {
      setIsSearch(true);
    }
    else {
      setIsSearch(false);
      setSearchRequest('');
    }
  }, [location.pathname, isSearch]);

  return (
    <div className="navbar">
      { isSearch
        ? (<>
            <RiArrowGoBackLine className="btn" onClick={() => { navigate('/'); }} /> 
            <input ref={searchBar} className="input-text" type="text" onChange={(e) => { setSearchRequest(e.target.value); }} placeholder="Rechercher" />
          </>)
        : (
          <>
            <Menu />

            <RiSearchLine className="btn" onClick={() => { navigate('search');} } />

            <div className="profil" onClick={() => { removeUserCookie(); navigate('/'); }}>
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

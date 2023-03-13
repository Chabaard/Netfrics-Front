/* eslint-disable brace-style */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Famille from '../../components/Famille';
import Loader from '../../components/Loader';
import { VideoContext } from '../../context/VideoContext';
import Movies from '../../components/Movies';
import './styles.scss';
import { useLocation } from 'react-router-dom';

function Accueil() {
  const { families, updatesFamilies, setOnlySeries, setOnlyMovies } = useContext(VideoContext);
  const [isLoad, setIsLoad] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      setOnlySeries(false); 
      setOnlyMovies(true);
    } 
    else if (location.pathname === '/series') {
      setOnlyMovies(false);
      setOnlySeries(true); 
    }
  }, [location.pathname]);

  useEffect(() => {
    updatesFamilies();
    setIsLoad(true)

    return () => {
      setOnlyMovies(false);
      setOnlySeries(false); 
    }
  }, []);
  return (!isLoad ? <Loader />
    : (
      <div className="body">
        {families && families.map((famille) => (
          famille && <Famille key={famille.name} {...famille} />
        ))
        }
      </div>
    )
  );
}

// == Export
export default React.memo(Accueil);

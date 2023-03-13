/* eslint-disable brace-style */
/* eslint-disable no-case-declarations */
import React, { useEffect, useContext } from 'react';
import Famille from '../../components/Famille';
import Loader from '../../components/Loader';
import { VideoContext } from '../../context/VideoContext';
import { useLocation } from 'react-router-dom';
import './styles.scss';

function Accueil() {
  const { families, updatesFamilies, setOnlySeries, setOnlyMovies, isLoad } = useContext(VideoContext);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/movies') {
      setOnlySeries(false); 
      setOnlyMovies(true);
    } 
    else if (location.pathname === '/series') {
      setOnlyMovies(false);
      setOnlySeries(true); 
    } else {
      setOnlyMovies(false);
      setOnlySeries(false); 
    }
  }, [location.pathname]);

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

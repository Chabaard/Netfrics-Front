/* eslint-disable brace-style */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect, useContext } from 'react';
import Famille from '../../components/Famille';
import Loader from '../../components/Loader';
import { VideoContext } from '../../context/VideoContext';
import './styles.scss';

function Movies() {
  const { families, updatesFamilies } = useContext(VideoContext);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(updatesFamilies());
  }, []);
  return (!isLoad ? <Loader />
    : (
      <div className="movies">
      {  families && families.map((famille) => (
        famille.movies && <Famille key={famille.name} {...famille} /> 
      ))
      }
      </div>
    )
  );
}

// == Export
export default React.memo(Movies);

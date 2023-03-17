/* eslint-disable brace-style */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect, useContext } from 'react';
import Loader from '../../components/Loader';
import { VideoContext } from '../../context/VideoContext';
import Affiche from '../../components/Affiche';
import './styles.scss';

function Favorite() {
  const { onlyFamilies, updatesFamilies } = useContext(VideoContext);
  const [isLoad, setIsLoad] = useState(false);
  const [favorites, setfavorites] = useState({ name: "Pas de favoris, restez appuyé sur une affiche pour faire apparaître l'étoile" });

  // eslint-disable-next-line consistent-return
  function generateFavorites() {
    if (onlyFamilies) {
      const nFavorites = {
        name: `Vos favoris`,
        movies: [],
        series: [],
      };
      onlyFamilies.forEach((f) => {
        if (f.movies) {
          f.movies.forEach((movie) => {
            if (movie.favorites) {
              nFavorites.movies.push(movie);
            }
          });
        }
        if (f.series && f.name === "Séries") {
          f.series.forEach((serie) => {
            if (serie.favorites && !nFavorites.series.includes(serie)) {
              nFavorites.series.push(serie);
            }
          });
        }
      });
      setfavorites(nFavorites);
    } else {
      setfavorites({ name: "Pas de favoris, restez appuyé sur une affiche pour faire apparaître l'étoile" });
    }
  }
  useEffect(() => {
    generateFavorites();
  }, [onlyFamilies]);
  useEffect(() => {
    setIsLoad(updatesFamilies());
  }, []);
  return (
    !isLoad
      ? <Loader />
      : (
        <div className="favorite">
          {
            favorites.series && favorites.series.map((affiche) => (
              <Affiche key={affiche.poster} {...affiche} type={'series'} />
            ))
          }
          {
            favorites.movies && favorites.movies.map((affiche) => (
              <Affiche key={affiche.poster} {...affiche} type={'movies'} />
            ))
          }
        </div>
      )
  );
}

// == Export
export default React.memo(Favorite);

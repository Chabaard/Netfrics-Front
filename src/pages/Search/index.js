/* eslint-disable brace-style */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect, useContext } from 'react';
import Loader from '../../components/Loader';
import { SearchContext } from '../../context/SearchContext';
import { VideoContext } from '../../context/VideoContext';
import Affiche from '../../components/Affiche';
import './styles.scss';

function Search() {
  const { families, updatesFamilies } = useContext(VideoContext);
  const [isLoad, setIsLoad] = useState(false);
  const [searchView, setSearchView] = useState({ name: 'Pas de recherche en cours... 2 caractères minimum' });
  const { searchRequest, setIsSearch } = useContext(SearchContext);

  // eslint-disable-next-line consistent-return
  function generateSearch() {
    if (families && searchRequest.length > 1) {
      const searchResult = {
        name: `Résultats de la recherche '${searchRequest}'`,
        movies: [],
        series: [],
      };
      families.forEach((f) => {
        if (f.movies) {
          f.movies.forEach((movie) => {
            if (movie.name.toLowerCase().includes(searchRequest.toLowerCase())) {
              searchResult.movies.push(movie);
            }
          });
        }
        if (f.name.toLowerCase().includes(searchRequest.toLowerCase()) && f.series) {
          f.series.forEach((serie) => {
            searchResult.series.push(serie);
          });
        }
      });
      setSearchView(searchResult);
    } else {
      setSearchView({ name: 'Pas de recherche en cours... 2 caractères minimum' });
    }
  }
  useEffect(() => {
    generateSearch();
  }, [searchRequest]);
  useEffect(() => {
    setIsLoad(updatesFamilies());

    return () => setIsSearch(false);
  }, []);
  return (
    !isLoad
      ? <Loader />
      : (
        <div className="search">
          {
            searchView.series && searchView.series.map((affiche) => (
              <Affiche {...affiche} type={'series'} />
            ))
          }
          {
            searchView.movies && searchView.movies.map((affiche) => (
              <Affiche {...affiche} type={'movies'} />
            ))
          }
        </div>
      )
  );
}

// == Export
export default React.memo(Search);

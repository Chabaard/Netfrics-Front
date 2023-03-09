/* eslint-disable brace-style */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect, useContext } from 'react';
import Famille from './Famille';
import './styles.scss';
import { utils } from '../../utils/utils';
import Loader from '../../components/Loader';
import { SearchContext } from '../../context/SearchContext';

function Search() {
  const dataFamilies = useSelector((state) => state.listMovies);
  const [isLoad, setIsLoad] = useState(false);
  const { searchRequest, setIsSearch } = useContext(SearchContext);

  // eslint-disable-next-line consistent-return
  function generateSearch() {
    if (dataFamilies && searchRequest.length > 1) {
      const searchView = {
        name: `Résultats de la reecherche '${searchRequest}'`,
        movies: [],
        series: [],
      };
      dataFamilies.forEach((f) => {
        if (f.movies !== null) {
          f.movies.forEach((movie) => {
            if (movie.name.toLowerCase().includes(searchRequest.toLowerCase())) {
              searchView.movies.push(movie);
            }
          });
        }
        if (f.name.toLowerCase().includes(searchRequest.toLowerCase()) && f.series !== null) {
          f.series.forEach((serie) => {
            searchView.series.push(serie);
          });
        }
      });
      return <Famille key={searchView.name} {...searchView} />;
    }
  }
  useEffect(() => {
    setIsLoad(utils.getVideos(dispatch));

    return () => setIsSearch(false);
  }, []);
  return (!isLoad ? <Loader />
    : (
      <div className="search">
        {generateSearch()}
      </div>
    )
  );
}

// == Export
export default React.memo(Search);

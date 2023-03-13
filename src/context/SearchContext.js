/* eslint-disable max-len */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [isSearch, setIsSearch] = useState(false);
  const [searchRequest, setSearchRequest] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values, object-curly-newline
    <SearchContext.Provider value={{ isSearch, setIsSearch, searchRequest, setSearchRequest }}>
      {children}
    </SearchContext.Provider>
  );
}
SearchProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
export { SearchContext, SearchProvider };

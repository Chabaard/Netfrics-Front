/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { request } from '../utils/request';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const UrlContext = createContext();

function UrlProvider({ children }) {
  const [cookies, setCookies, removeCookies] = useCookies(['url']);
  const [url, setUrl] = useState(cookies.url);
  const [isLoad, setIsLoad] = useState(false);

  const testUrl = async (newUrl) => {
    try {
      console.error(response, `test de ${newUrl}/testurl`)
      const response = await axios.get(`${newUrl}/testurl`)
      if (response) {
        return true;
      } else {
        return false;
      }
    }
    catch(err) {
      console.log(err);
      return false;
    }
  } 

  async function updateUrl(newUrl) {
    if (await testUrl(newUrl)) {
      setUrl(newUrl);
      setIsLoad(true);
      setCookies('url', newUrl);
    } else {
      return "L'url indiqué ne fonctionne pas.";
    }
  }

  async function createUrl(newUrl) {
    if (await testUrl(newUrl)) {
      setUrl(newUrl)
      setIsLoad(true);
      setCookies('url', newUrl);
    } else {
      return "L'url indiqué ne fonctionne pas.";
    }
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values, object-curly-newline
    <UrlContext.Provider value={{ updateUrl, createUrl, url }}>
      {children}
    </UrlContext.Provider>
  );
}
UrlProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
export { UrlContext, UrlProvider };

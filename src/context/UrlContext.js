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

  const testUrl = async (url) => {
    try {
      const response = await axios.get(`${url}/testurl`)
      console.error(response, `test de ${url}/testurl`)
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

  async function updateUrl(url) {
    if (await testUrl(url)) {
      setUrl(url);
      setIsLoad(true);
      setCookies('url', url);
    } else {
      return "L'url indiqué ne fonctionne pas.";
    }
  }

  async function createUrl(url) {
    if (await testUrl(url)) {
      setUrl(url)
      setIsLoad(true);
      setCookies('url', url);
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

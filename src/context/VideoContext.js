/* eslint-disable max-len */
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { request } from '../utils/request';

const VideoDataContext = createContext();

function VideoDataProvider({ children }) {
  const [families, setFamilies] = useState(0);
  async function updatesFamilies() {
    
  }
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values, object-curly-newline
    <VideoDataContext.Provider value={{ videoInfos }}>
      {children}
    </VideoDataContext.Provider>
  );
}
VideoDataProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
export { VideoDataContext, VideoDataProvider };

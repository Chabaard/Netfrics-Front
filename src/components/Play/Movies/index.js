/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

// function
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VideoContext } from '../../../context/VideoContext';
import { VideoDataContext } from '../../../context/VideoDataContext';
import { request } from '../../../utils/request';

// Component
import Famille from '../../Famille';
import VideoPlayer from '../VideoPlayer';

// Style
import './styles.scss';

function Movies() {
  const { families, updatesFamilies } = useContext(VideoContext);
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { setVideoInfos } = useContext(VideoDataContext);
  const handlerMovies = {
    async getMovies() {
      const response = await request.get(`movies/${id}`);
      setData(response);
      setVideoInfos({...response, type: 'movies' });
    },
    previousOrNextEpisode(num) {
      const newMovie = data.families_movies.filter((f) => f.number === data.number + num)[0];
      if (newMovie) {
        setData(newMovie);
        navigate(`/play/movies/${newMovie.id}`);
      }
    },
  };
  useEffect(() => {
    handlerMovies.getMovies();
  }, [id]);

  useEffect(() => {
    updatesFamilies();
  }, []);
  
  function jsx() {
    return (
      <>
        <h2 className="title">{data.name}</h2>
        <VideoPlayer {...data} changeEp={handlerMovies.previousOrNextEpisode} />
        {families && data && <Famille { ...families.filter((familie) => familie.id === data.families_id)[0]}/>}
      </>
    );
  }

  return data ? jsx() : '';
}

// == Export
export default React.memo(Movies);

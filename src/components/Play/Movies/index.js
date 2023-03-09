/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

// function
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VideoDataContext } from '../../../context/VideoDataContext';
import { request } from '../../../utils/request';

// Component
import Famille from '../../Famille';
import VideoPlayer from '../VideoPlayer';

// Style
import './styles.scss';

function Movies() {
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

  function jsx() {
    return (
      <>
        <h2 className="title">{data.name}</h2>
        <VideoPlayer {...data} changeEp={handlerMovies.previousOrNextEpisode} />
        <Famille movies={data.families_movies} name={data.families_name} />
      </>
    );
  }

  return data ? jsx() : '';
}

// == Export
export default React.memo(Movies);

/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

// function
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { request } from '../../../utils/request';

// Component
import { VideoDataContext } from '../../../context/VideoDataContext';
import DropDownSelect from '../DropDownSelect';
import Famille from '../../Famille';
import Loader from '../../Loader';
import VideoPlayer from '../VideoPlayer';

// Style
import './styles.scss';

function Series() {
  const [cookies] = useCookies(['user']);
  const navigate = useNavigate();
  const [series, setSeries] = useState();
  const { setVideoInfos } = useContext(VideoDataContext);

  const [isLoad, setIsLoad] = useState(false);
  const { id, epId } = useParams();
  const [serie, setSerie] = useState(); // Serie with seasons with episodes
  const [season, setSeason] = useState();
  const [episode, setEpisode] = useState();

  const getSeasonByNumber = (number, ser = serie) => ser.seasons.filter((s) => s.number === Number(number))[0];
  const getSeasonById = (number, ser = serie) => ser.seasons.filter((s) => s.id === Number(number))[0];

  // eslint-disable-next-line consistent-return
  async function gotLatestViewed() {
    const response = await request.get(`latestepisodeviewed/${id}/${cookies.user.id}`);
    if (response) return response[0];
  }

  async function getSeries() {
    const response = await request.get(`series/${id}/${cookies.user.id}`);
    setSerie(response.series[0]);
    setSeries(await request.get('series'));
    const latest = await gotLatestViewed();
    if (latest) {
      navigate(`/play/series/${id}/${latest.episodes_id}`);
    }
    else {
      const sea = getSeasonByNumber(1, response.series[0]);
      const ep = sea.episodes[0];
      navigate(`/play/series/${id}/${ep.id}`);
    }
  }
  async function getEpisode() {
    if (serie && epId) {
      const response = await request.get(`episodes/${epId}`);
      setSeason(getSeasonById(response.seasons_id));
      setEpisode(response);
      setVideoInfos({ ...response, type: 'series', series_id: Number(id) });
    }
    else {
      getSeries();
    }
  }

  const previousOrNextEpisode = (num) => {
    const newEpisode = season.episodes[(episode.number - 1) + num];
    if (newEpisode) {
      navigate(`/play/series/${id}/${newEpisode.id}`);
      return;
    }
    const newSeason = getSeasonByNumber(season.number + num);
    if (newSeason) {
      navigate(`/play/series/${id}/${newSeason.episodes[0].id}`);
    }
  };

  const handleSeason = (e) => {
    const sea = getSeasonById(e.target.value);
    const ep = sea.episodes[0];
    setSeason(sea);
    navigate(`/play/series/${id}/${ep.id}`);
  };

  const handleEpisode = (e) => {
    navigate(`/play/series/${id}/${e.target.value}`);
  };

  useEffect(() => {
    getSeries();
  }, [id]);
  useEffect(() => {
    if (epId !== '0') {
      getEpisode();
    }
  }, [epId, serie]);
  useEffect(() => {
    if (episode) {
      setIsLoad(true);
    }
  }, [episode]);
  function getvideo() {
    return (
      <>
        <h2 className="title">{episode.name}</h2>
        <VideoPlayer poster={serie.poster} {...episode} changeEp={previousOrNextEpisode} />
        {series && <Famille key="series" series={series} name="Séries" />}
      </>
    );
  }

  const jsx = () => {
    if (isLoad) {
      return (
        <>
          { serie ? <DropDownSelect number={season ? season.id : 0} setNumber={handleSeason} dataOptions={serie.seasons} optionText="Saison" /> : ''}
          { season ? <DropDownSelect number={episode ? episode.id : 0} setNumber={handleEpisode} dataOptions={season.episodes} optionText="Episode" /> : ''}
          { episode ? getvideo() : '' }
        </>
      );
    }
    return <Loader />;
  };
  return (jsx());
}

// == Export
export default React.memo(Series);

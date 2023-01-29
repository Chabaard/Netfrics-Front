/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

// function
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { request } from '../../../utils/request';

// Component
import Famille from '../Body/Famille';
import DropDownSelect from './DropDownSelect';
import Video from './Video';

// Style
import './styles.scss';

function Play() {
  const user = useSelector((state) => state.user); // utilisateur
  const dataSeries = useSelector((state) => state.listSeries); // list des series // permet d'afficher la liste des autres series
  const dataMovies = useSelector((state) => state.listMovies);// list des movies de la famille du film // permet d'afficher la liste des autres films de la famille
  const id = useSelector((state) => state.id) || useParams().id; // serie id
  const { type } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const handlerSeries = {
    init() {
      if (data) setData(null);
    },
    getSeries: (seriesList = dataSeries) => seriesList.series.filter((s) => s.id === id)[0],
    getSeason: (number) => handlerSeries.getSeries(dataSeries).seasons.filter((s) => s.number === Number(number))[0],
    getEpisode: (season, number) => season.episodes.filter((ep) => ep.number === Number(number))[0],
    changeSeason(num, previous) {
      const newSaison = handlerSeries.getSeason(num);
      if (newSaison && document.getElementById('seasons')) {
        document.getElementById('seasons').value = newSaison.number;
        let i = 1;
        // je veux qu'a la pression du bouton previous sur lepisode 1 ca retourne a la saison preccedente sur le dernier episode de la saison
        if (previous && data.number === 1) i = newSaison.episodes.length;
        handlerSeries.changeEpisode(newSaison, i);
        return true;
      }
      return false;
    },
    changeEpisode(season, num) {
      const newEp = handlerSeries.getEpisode(season, num);
      if (newEp && document.getElementById('episodes')) {
        document.getElementById('episodes').value = newEp.number;
        setData(newEp);
        return true;
      }
      return false;
    },
    async gotLatestViewed() {
      if (document.getElementById('seasons') && !document.getElementById('video')) {
        let find = false;
        const response = await request.get(`listseries/${user.id}`);
        handlerSeries.getSeries(response[0]).seasons.every((season) => {
          if (find) return false;
          season.episodes.every((ep) => {
            if (!ep.finished) {
              handlerSeries.changeSeason(season.number);
              handlerSeries.changeEpisode(season, ep.number);
              find = true;
              return false;
            }
            return true;
          });
          return true;
        });
      }
    },
    previousOrNextEpisode(num) {
      if (handlerSeries.changeEpisode(handlerSeries.getSeason(data.seasonsNumber), data.number + num)) return true;
      if (handlerSeries.changeSeason(data.seasonsNumber + num, num < 0));
      return true;
    },
  };

  const handlerMovies = {
    getMovies() {
      dataMovies.forEach((f) => {
        f.films.forEach((m) => {
          if (m.id === id) {
            setData(m);
          }
        });
      });
    },
    getFamily() {
      return dataMovies.filter((fam) => fam.id === data.families_id)[0];
    },
    previousOrNextEpisode(num) {
      const newMovie = handlerMovies.getFamily().films.filter((f) => f.number === data.number + num)[0];
      if (newMovie) {
        setData(newMovie);
        navigate(`/movies/${newMovie.id}`);
      }
    },
  };

  useEffect(() => {
    if (!data) {
      handlerSeries.gotLatestViewed();
    }
  }, [data]);
  useEffect(() => {
    switch (type) {
      case 'series':
        handlerSeries.init();
        break;
      case 'movies':
        handlerMovies.getMovies();
        break;
      default:
        console.log('no type found');
    }
  }, [id]);

  function getvideo() {
    const newData = {};
    switch (type) {
      case 'series':
        newData.name = dataSeries.name;
        newData.data = dataSeries.series;
        newData.type = type;
        newData.changeEp = handlerSeries.previousOrNextEpisode;
        break;
      case 'movies':
        newData.name = handlerMovies.getFamily().name;
        newData.data = handlerMovies.getFamily().films;
        newData.type = type;
        newData.changeEp = handlerMovies.previousOrNextEpisode;
        break;
      case 'mangas':
        newData.name = handlerMovies.getFamily().name;
        newData.data = handlerMovies.getFamily().films;
        newData.type = type;
        newData.changeEp = handlerSeries.previousOrNextEpisode;
        console.log('waiting mangas');
        break;
      default:
        console.log('no type found');
    }
    return (
      <>
        <h2 className="title">{data.name}</h2>
        <Video
          {...data}
          changeEp={newData.changeEp}
        />
        <Famille {...newData} />
      </>
    );
  }

  return (
    (
      <div className="play">
        {type === 'series' ? <DropDownSelect saison={data ? handlerSeries.getSeason(data.seasonsNumber) : null} episode={data} handlerSeries={handlerSeries} /> : ''}
        { data ? getvideo() : '' }
      </div>
    )
  );
}
// == Export
export default React.memo(Play);

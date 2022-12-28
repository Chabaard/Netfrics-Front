/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

// function
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Component
import Famille from '../Body/Famille';
import DropDownSelect from './DropDownSelect';
import Video from './Video';

// Style
import './styles.scss';

function PlaySerie() {
  const user = useSelector((state) => state.user); // utilisateur
  const dataSeries = useSelector((state) => state.listSeries); // list des series // permet d'afficher la liste des autres series
  const dataMovies = useSelector((state) => state.listMovies);// list des movies de la famille du film // permet d'afficher la liste des autres films de la famille
  const id = useSelector((state) => state.id) || useParams().id; // serie id
  const { type } = useParams();
  const [data, setData] = useState();

  const handlerSeries = {
    init() {
      if (data) setData(null);
      handlerSeries.gotLatestViewed();
    },
    getSeries: () => dataSeries.series.filter((s) => s.id === id)[0],
    getSeason: (number) => handlerSeries.getSeries().seasons.filter((s) => s.number === Number(number))[0],
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
    gotLatestViewed() {
      if (document.getElementById('seasons') && !document.getElementById('video')) {
        let find = false;
        handlerSeries.getSeries().seasons.every((season) => {
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
            console.log(m);
          }
        });
      });
    },
    getFamily() {
      return dataMovies.filter((fam) => fam.id === data.families_id)[0];
    },
    getSeason: (number) => handlerSeries.getSeries().seasons.filter((s) => s.number === Number(number))[0],
    previousOrNextEpisode(num) {
      let previous = false;
      if (num === -1) previous = true;
      handlerSeries.changeEpisode(handlerSeries.getSeason(data.seasonsNumber), data.number + num);
      handlerSeries.changeSeason(handlerSeries.getSeason(data.seasonsNumber).number + num, previous);
    },
  };
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

  return (
    (
      <div className="play-serie">
        {type === 'series' ? <DropDownSelect serie={handlerSeries.getSeries()} saison={data ? handlerSeries.getSeason(data.seasonsNumber) : null} episode={data} handlerSeries={handlerSeries} /> : ''}
        {
        data ? (
          <>
            <h2 className="title">{data.name}</h2>
            <Video
              key={data.id}
              {...data}
              changeEp={handlerSeries.previousOrNextEpisode}
              user={user}
            />
            { type === 'series'
              ? <Famille key={type} name={dataSeries.name} data={dataSeries.series} {...{ type: type }} />
              : <Famille key={type} name={handlerMovies.getFamily().name} data={handlerMovies.getFamily().films} {...{ type: type }} /> }
          </>
        )
          : ''
        }
      </div>
    )
  );
}
// == Export
export default React.memo(PlaySerie);

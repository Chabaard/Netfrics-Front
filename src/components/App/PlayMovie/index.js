import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { request } from '../../../utils/request';
import Famille from '../Body/Famille';
import Video from './Video';

function PlayMovie() {
  const [data, setData] = useState();
  const [dataF, setDataF] = useState();

  const id = useSelector((state) => state.id) || useParams().id;
  useEffect(() => {
    const controller = new AbortController();
    controller.abort();
    const f = async () => {
      const response = await request.get(`movie/${id}`);
      setData(response);
    };
    f();
  }, [id]);
  useEffect(() => {
    const f = async () => {
      const response = await request.get(`familie-movies/${data.families_id}`);
      setDataF(response[0]);
    };
    if (data) {
      f();
    }
  }, [data]);
  console.log(useLocation())
  return (
    <div className="play-movie">
      { data
        ? (
          <Video
            key={data.name}
            {...data}
          />
        )
        : ''}
      { dataF ? <Famille key={dataF.name} name={dataF.name} data={dataF.films} {...{ type: 'film' }} /> : ''}
    </div>
  );
}
// == Export
export default React.memo(PlayMovie);

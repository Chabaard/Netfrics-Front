/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

// function
import React from 'react';
import { useParams } from 'react-router-dom';

// Component
import Movies from './Movies';
import Series from './Series';

// Style
import './styles.scss';

function Play() {
  const { type } = useParams();

  return (
    (
      <div className="play">
        {type === 'movies' ? <Movies /> : ''}
        {type === 'series' ? <Series /> : ''}
      </div>
    )
  );
}
// == Export
export default React.memo(Play);

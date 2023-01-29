/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function DropDownSelect({ saison, episode, handlerSeries }) {
  return (
    <div className="container-select">
      <select name="seasons" id="seasons" onChange={(e) => handlerSeries.changeSeason(e.target.value)}>
        {handlerSeries.getSeries().seasons.map((season) =>
          <option key={season.id} value={season.number}>Saison {season.number}</option>)}
      </select>
      <select name="episodes" id="episodes" value={episode ? episode.number : ''} onChange={(e) => handlerSeries.changeEpisode(saison, e.target.value)}>
        {saison
          ? (saison.episodes.map((ep) =>
            <option key={ep.id} value={ep.number} className={ep.finished ? 'eye' : ''}> Episode {ep.number} </option>))
          : ''}
      </select>
    </div>
  );
}
DropDownSelect.propTypes = {
  saison: PropTypes.object,
  episode: PropTypes.object,
  handlerSeries: PropTypes.object.isRequired,
};
DropDownSelect.defaultProps = {
  saison: null,
  episode: null,
};
// == Export
export default React.memo(DropDownSelect);

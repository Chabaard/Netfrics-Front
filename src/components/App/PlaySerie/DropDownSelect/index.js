/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function DropDownSelect({ serie, saison, episode, handlerSeries }) {
  return (
    <div className="container-select">
      <select name="seasons" id="seasons" onChange={(e) => handlerSeries.changeSeason(e.target.value)}>
        {serie.seasons.map((season) =>
          <option key={season.number} value={season.number}>Saison {season.number}</option>)}
      </select>
      <select name="episodes" id="episodes" value={episode ? episode.number : ''} onChange={(e) => handlerSeries.changeEpisode(saison, e.target.value)}>
        {saison
          ? saison.episodes.map((ep) =>
            <option key={ep.number} value={ep.number} className={ep.finished ? 'eye' : ''}> Episode {ep.number} </option>)
          : ''}
      </select>
    </div>
  );
}
DropDownSelect.propTypes = {
  serie: PropTypes.object.isRequired,
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

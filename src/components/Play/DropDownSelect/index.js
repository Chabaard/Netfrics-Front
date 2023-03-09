/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function DropDownSelect({ dataOptions, number, setNumber, optionText }) {
  return (
    <div className="container-select">
      <select name="select" value={number} id="select" onChange={setNumber}>
        <option key={0} value={0}> Choix </option>
        {dataOptions.map((option) =>
          <option key={option.id} value={option.id}>{optionText} {option.number}</option>)}
      </select>
    </div>
  );
}
DropDownSelect.propTypes = {
  number: PropTypes.number,
  setNumber: PropTypes.func.isRequired,
  dataOptions: PropTypes.array.isRequired,
  optionText: PropTypes.string.isRequired,
};
DropDownSelect.defaultProps = {
  number: 0,
};
// == Export
export default React.memo(DropDownSelect);

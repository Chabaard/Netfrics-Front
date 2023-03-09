/* eslint-disable brace-style */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Loader(absolute) {
  return (
    <div className={`loader-container ${absolute ? 'absolute' : ''}`}>
      <div className="loader" />
    </div>
  );
}

Loader.propTypes = {
  absolute: PropTypes.bool,
};

Loader.defaultProps = {
  absolute: false,
};
// == Export
export default React.memo(Loader);

/* eslint-disable brace-style */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Loader({isAbsolute}) {
  return (
    <div className={`loader-container ${isAbsolute ? 'absolute' : ''}`}>
      <div className="loader" />
    </div>
  );
}

Loader.propTypes = {
  isAbsolute: PropTypes.bool,
};

Loader.defaultProps = {
  isAbsolute: false,
};
// == Export
export default React.memo(Loader);

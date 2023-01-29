/* eslint-disable brace-style */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

function NotFound({ login }) {
  return (
    <div className="notFound">
      404
      C'est un chemin complètement inconnu {login}.

    </div>
  );
}

NotFound.propTypes = {
  login: PropTypes.string,
};
NotFound.defaultProps = {
  login: null,
};

// == Export
export default React.memo(NotFound);

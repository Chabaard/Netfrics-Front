/* eslint-disable brace-style */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

function NotFound({ login }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  });

  return (
    <div className="notFound">
      404
      Le lien sur lequel tu as demandé à aller n'éxiste pas {login}.

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

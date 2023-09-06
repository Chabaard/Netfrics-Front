import React, { useState, useEffect } from 'react';
import { RiArrowDownSLine, RiArrowRightSLine, RiFilmLine, RiFolderLine, RiFolderOpenLine, RiMovieLine } from "react-icons/ri";

import './styles.scss';
import PropTypes from 'prop-types';

function Files({ name, alreadyExist, file, refreshFormData, formData, isChecked}) {
  const [check, setCheck] = useState(isChecked);

  const toggleCheck = () => {
    setCheck(!check);
  }

  useEffect(() => {
    if(check) file.isChecked = check; 
    else file.isChecked = check;
    refreshFormData();

  }, [check])

  useEffect(() => {
    setCheck(file.isChecked); 
  }, [formData]);

  return (
    <div className="files grid-item">
        <input className="checkbox" type="checkbox" checked={check} onChange={toggleCheck} />
        <p className="unroll"><RiFilmLine /></p>
        <p className="name">{name}</p>
        <p className="import">{alreadyExist ? "oui" : "non"}</p>
    </div>
  );
}
Files.propTypes = {
  file: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  refreshFormData: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
};
Files.defaultProps = {
  isChecked: false,
}
// == Export
export default React.memo(Files);

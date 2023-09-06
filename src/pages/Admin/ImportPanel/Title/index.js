import React, { useState, useEffect } from 'react';
import { RiArrowDownSLine, RiArrowRightSLine, RiFolderLine, RiFolderOpenLine } from "react-icons/ri";
import './styles.scss';
import PropTypes from 'prop-types';

function Title({ isUnroll, isChecked, name, alreadyExist, setIsUnroll, userClick, }) {
  
  return (
    <div className={`${isUnroll && 'title'} grid-item`}>
      <input className="checkbox" type="checkbox" checked={isChecked} onChange={userClick} />
      <p className="unroll" onClick={() => setIsUnroll(!isUnroll)}>{isUnroll ? <RiFolderOpenLine /> : <RiFolderLine />}</p>
      <p className="name">{name}</p>
      <p className="import">{alreadyExist ? "yes" : "no"}</p>
    </div>
  );
}
Title.propTypes = {
  isUnroll: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  alreadyExist: PropTypes.bool.isRequired,
  setIsUnroll: PropTypes.func.isRequired,
  userClick: PropTypes.func.isRequired,
};
Title.defaultProps = {
}
// == Export
export default React.memo(Title);

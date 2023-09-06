import React, { useState, useEffect } from 'react';
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";

import './styles.scss';
import PropTypes from 'prop-types';
import Files from '../Files';
import Title from '../Title';

function Folder({ name, alreadyExist, folder, files, folders, formData, refreshFormData, isChecked}) {
  const [isUnroll, setIsUnroll] = useState(false);
  const [check, setCheck] = useState(isChecked);

  // je clique sur le dossier ça me coche tous les enfants
  const userClick = () => {
    addAll(folder, !check);
  };

  useEffect(() => {
    if(check) folder.isChecked = check; 
    else folder.isChecked = check;
    refreshFormData();
  }, [check])

  const addAll = (folder, checkIt) => {
    folder.isChecked = checkIt;
    folder.files && folder.files.forEach(e => { e.isChecked = checkIt;});
    if (folder.folders) {
      folder.folders.forEach(e => addAll(e, checkIt));
    }
    setCheck(checkIt);
  }

  // si j'ai un fichier coché son parent doit s'afficher comme coché pour montré qu'il y en a un de coché
  useEffect(()=> {
    if ((files && files.filter((file) => file.isChecked)[0]) || (folders && folders.filter((folder) => folder.isChecked)[0])) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [formData]);

  return (
    <div className="folder">
        <Title 
          isUnroll={isUnroll}
          isChecked={check}
          name={name}
          alreadyExist={alreadyExist}
          setIsUnroll={setIsUnroll}
          userClick={userClick}
        />
        {folders && isUnroll && folders.map((folder) => (
          <Folder {...folder}
            folder={folder}
            formData={formData}
            refreshFormData={refreshFormData}
            key={folder.name} 
          /> ))}
        {files && isUnroll && files.map((file) => (
          !file.alreadyExist ?
          <Files {...file} 
            file={file}
            formData={formData}
            refreshFormData={refreshFormData}
            key={file.name}
          /> : "") )}
    </div>
  );
}
Folder.propTypes = {
  folder: PropTypes.object.isRequired,
  isChecked: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  refreshFormData: PropTypes.func.isRequired,
};
Folder.defaultProps = {
  isChecked: false,
}
// == Export
export default React.memo(Folder);

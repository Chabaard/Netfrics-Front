import React, { useContext, useEffect, useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { request } from '../../../utils/request';
import Loader from '../../../components/Loader';
import { VideoContext } from '../../../context/VideoContext';
import Folder from './Folder';
import { RiArrowDownSLine } from 'react-icons/ri';
import Files from './Files';
import { UrlContext } from '../../../context/UrlContext';

function ImportPanel({ refresh, setRefresh }) {
  const { url } = useContext(UrlContext);
  const [isLoad, setIsLoad] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [files, setFiles] = useState();
  const [formData, setFormData] = useState({});
  const { updatesFamilies } = useContext(VideoContext);

   async function getFiles() {
    const result = await request.get({url, route: 'refreshfiles'});
    if (result) {
      setFiles(result);
      setIsLoad(false);
      console.log(result)
    }
  }

  const refreshFormData = () => {
    setFormData({...files});
  }

  if (!files) getFiles();

  function selectAll() {
    setIsChecked(!isChecked);
    addAll(files, !isChecked);
    refreshFormData();
  }

  const addAll = (folder, checkIt) => {
    folder.isChecked = checkIt;
    folder.files && folder.files.forEach(e => { e.isChecked = checkIt;});
    if (folder.folders) {
      folder.folders.forEach(e => addAll(e, checkIt));
    }
  }
  async function submit(e) {
    e.preventDefault();
    refreshFormData();
    console.log(formData);
    // if (formData.length > 0) {
    //   const response = await request.post({url, route: 'add/videos', data: { data: formData }, type: 'json'});
    //   setIsLoad(true);
    //   if (response) {
    //     setFormData([]);
    //     setIsCheckedAll(false);
    //     getFiles();
    //     await updatesFamilies();
    //   }
    // }
  }
  useEffect(() => {
    if (files) {
      files.isChecked = isChecked;
    }
  }, [isChecked])
  useEffect(()=> {
    if (files && ((files.files && files.files.filter((file) => file.isChecked)[0]) || (files.folders && files.folders.filter((folder) => folder.isChecked)[0]))) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [formData]);

  return isLoad ? <Loader /> : (
    <form className="form-panel-admin" onSubmit={submit}>
      <div className="admin-grid-import-top">
        <input className="checkbox" type="checkbox" checked={isChecked} onChange={selectAll} />
        <p className="unroll"></p>
        <p className="name">Nom</p>
        <p className="import">Importé</p>
      </div>
      <div className="admin-grid-import-middle">
          {
            files.folders && files.folders.map((folder) => (
              <Folder 
                {...folder}
                folder={folder}
                formData={formData}
                refreshFormData={refreshFormData}
                key={folder.name} 
              />))
          }
          {
            files.files && files.files.map((file) => (
              <Files 
                {...file}
                file={file}
                formData={formData}
                refreshFormData={refreshFormData}
                key={file.name} 
              />))
          }
      </div>
      <div className="admin-grid-import-bottom">
        <input className="form-submit input-button" type="button" value="Annuler" />    
        <input className="form-submit input-button" type="submit" value="Ajouter" />
      </div>
    </form>
  );
}

ImportPanel.propTypes = {
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
};
// == Export
export default React.memo(ImportPanel);

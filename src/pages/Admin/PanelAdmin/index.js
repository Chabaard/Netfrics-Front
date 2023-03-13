import React, { useContext, useEffect, useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { request } from '../../../utils/request';
import Item from './Item';
import Loader from '../../../components/Loader';
import { VideoContext } from '../../../context/VideoContext';

function PanelAdmin({ refresh, setRefresh }) {
  const [isLoad, setIsLoad] = useState(true);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [files, setFiles] = useState();
  const [formData, setFormData] = useState([]);
  const { updatesFamilies } = useContext(VideoContext);

  async function getFiles() {
    const result = await request.get('refreshfiles');
    if (result) {
      setFiles(result);
      setIsLoad(false);
    }
  }

  if (!files) getFiles();
  function selectAll() {
    setIsCheckedAll(!isCheckedAll);
  }
  function onChange(e) {
    setIsCheckedAll(e.target.checked);
  }
  function generateItem() {
    if (files) {
      const folders = files.folders.filter((folder) => !folder.alreadyExist);
      const items = folders.map((folder) => (
        <Item
          key={folder.name}
          folder={folder}
          refresh={refresh}
          isCheckedAll={isCheckedAll}
          setFormData={setFormData}
          formData={formData}
        />
      ));
      return items;
    }
    return null;
  }
  async function submit(e) {
    e.preventDefault();
    if (formData.length > 0) {
      const response = await request.post('add/videos', { data: formData }, 'json');
      setIsLoad(true);
      if (response) {
        setFormData([]);
        setIsCheckedAll(false);
        getFiles();
        await updatesFamilies();
      }
    }
  }
  function cancel() {
    setIsCheckedAll(false);
    setRefresh(!refresh);
    // remettre le texte comme il était
  }
  useEffect(() => {
    if (isCheckedAll) setFormData(files.folders.filter((folder) => !folder.alreadyExist));
    else setFormData([]);
  }, [isCheckedAll]);

  // rechargement du formData pour ajouter ou supprimé des éléments
  useEffect(() => { }, [formData]);
  return isLoad ? <Loader /> : (
    <form className="form-panel-admin" onSubmit={submit}>
      <table id="menu-admin" className="menu">
        <thead>
          <tr onClick={selectAll} className="container-item">
            <th className="begin">
              <input id="checkbox-all" onChange={onChange} checked={isCheckedAll} type="checkbox" />
            </th>
            <th className="name">Nom</th>
            <th>Intégré</th>
            <th className="add end"> </th>
          </tr>
        </thead>
        <tbody className="tbody" onScroll={(e) => console.log(e.target.scrollTop)}>
          { generateItem()}
        </tbody>
        <tfoot>
          <tr className="container-item">
            <th>
              <input className="form-submit input-button" onClick={cancel} type="button" value="Annuler" />
            </th>
            <th>
              <input className="form-submit input-button" type="submit" value="Ajouter" />
            </th>
          </tr>
        </tfoot>
      </table>
    </form>
  );
}

PanelAdmin.propTypes = {
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
};
// == Export
export default React.memo(PanelAdmin);

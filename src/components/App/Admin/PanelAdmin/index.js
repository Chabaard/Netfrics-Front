import React, { useEffect, useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { request } from '../../../../utils/request';
import Item from './Item';

function PanelAdmin({ refresh, setRefresh }) {
  console.log('admin');
  const dataMovies = useSelector((state) => state.listMovies);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [files, setFiles] = useState();
  const [formData, setFormData] = useState([]);

  async function getFiles() {
    const dataExist = [];
    dataMovies.forEach((data) => dataExist.push(data.name));

    const result = await request.get('refreshfiles');
    if (dataMovies && result) {
      result.folder.forEach((file) => {
        if (dataExist.includes(file.name)) {
          file.alreadyExist = true;
        }
      });
      setFiles(result);
    }
  }

  if (!files && dataMovies) getFiles();
  function selectAll() {
    setIsCheckedAll(!isCheckedAll);
  }
  function onChange(e) {
    setIsCheckedAll(e.target.checked);
  }
  function generateItem() {
    if (files && dataMovies) {
      const folders = files.folder.filter((folder) => !folder.alreadyExist);
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
      console.log('ca marche', formData);
      // await request.post('user', formData);
      // dispatch(setUsersData(await request.get('listusers')));
      // setOpen(false);
    }
  }
  function cancel(e) {
    setIsCheckedAll(false);
    setRefresh(!refresh);
    // remettre le texte comme il était
  }
  useEffect(() => {
    if (isCheckedAll) setFormData(files.folder.filter((folder) => !folder.alreadyExist));
    else setFormData([]);
  }, [isCheckedAll]);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
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
          {generateItem()}
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

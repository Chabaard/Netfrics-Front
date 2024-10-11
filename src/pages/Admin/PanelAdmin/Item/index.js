import React, { useState, useEffect } from 'react';
import { RiArrowDownSLine } from "react-icons/ri";

import './styles.scss';
import PropTypes from 'prop-types';

function Item({ refresh, folder, isCheckedAll, formData, setFormData, isSub}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isUnroll, setIsUnroll] = useState(false);
  function removeData() {
    setFormData(formData.filter(((data) => data !== folder)));
  }
  useEffect(() => {
    setIsChecked(isCheckedAll);
  }, [isCheckedAll]);
  useEffect(() => {
    setIsChecked(false);
  }, [refresh]);
  useEffect(() => {
    if (!isCheckedAll) {
      if (isChecked) {
        setFormData([...formData, folder]);
      }
      else removeData();
    }
    else if (!isChecked) removeData();
  }, [isChecked]);

  return (
    <><tr className={`item container-item ${isSub ? "sub" : ""} `} key={folder.name} onClick={(e) => {if (e.target.id != "unroll") setIsChecked(!isChecked)}}>
      {isSub ? <td /> : ''}
      <td className="begin">
        <input
          id="checkbox"
          value={folder}
          onChange={(e) => setIsChecked(e.target.checked)}
          checked={isChecked}
          type="checkbox"
        />
      </td>
      {folder.files || folder.folders ? <td id="unroll" onClick={(e) => {e.preventDefault(); setIsUnroll(!isUnroll); e.stopPropagation()}}><RiArrowDownSLine /> </td> : ''}
      <td className="name">{folder.name}</td>
      <td>{folder.alreadyExist ? 'oui' : 'non'}</td>
      {/* <td className="add end"> </td> */}
    </tr>
    { isUnroll && folder.files && folder.files.map((file) => (
      <Item
          key={file.name}
          folder={file}
          refresh={refresh}
          isCheckedAll={isCheckedAll}
          setFormData={setFormData}
          formData={formData}
          isSub={true}
        />
    ))}
    { isUnroll && folder.folders && folder.folders.map((folder) => (
      <Item
          key={folder.name}
          folder={folder}
          refresh={refresh}
          isCheckedAll={isCheckedAll}
          setFormData={setFormData}
          formData={formData}
          isSub={true}
        />
    ))}
    </>
  );
}
Item.propTypes = {
  isSub: PropTypes.bool,
  folder: PropTypes.object.isRequired,
  isCheckedAll: PropTypes.bool.isRequired,
  refresh: PropTypes.bool.isRequired,
  formData: PropTypes.array.isRequired,
  setFormData: PropTypes.func.isRequired,
};
Item.defaultProps = {
  isSub: false,
}
// == Export
export default React.memo(Item);

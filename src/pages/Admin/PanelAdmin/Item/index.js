import React, { useState, useEffect } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

function Item({
  refresh,
  folder,
  isCheckedAll,
  formData,
  setFormData,
}) {
  const [isChecked, setIsChecked] = useState(false);
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
    <tr className="item container-item" key={folder.name} onClick={() => setIsChecked(!isChecked)}>
      <th className="begin">
        <input
          id="checkbox"
          value={folder}
          onChange={(e) => setIsChecked(e.target.checked)}
          checked={isChecked}
          type="checkbox"
        />
      </th>
      <th className="name">{folder.name}</th>
      <th>{folder.alreadyExist ? 'oui' : 'non'}</th>
      <th className="add end"> </th>
    </tr>
  );
}
Item.propTypes = {
  folder: PropTypes.object.isRequired,
  isCheckedAll: PropTypes.bool.isRequired,
  refresh: PropTypes.bool.isRequired,
  formData: PropTypes.array.isRequired,
  setFormData: PropTypes.func.isRequired,
};

// == Export
export default React.memo(Item);

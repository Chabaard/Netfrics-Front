import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PanelAdmin from './PanelAdmin';
import './styles.scss';
import ImportPanel from './ImportPanel';

function Admin() {
  console.log('admin');

  const { adminPanel } = useParams();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {}, [refresh]);

  return (
    <div className="admin">
      <ImportPanel setRefresh={setRefresh} refresh={refresh} /> 
    </div>
  );
}
// == Export
export default React.memo(Admin);

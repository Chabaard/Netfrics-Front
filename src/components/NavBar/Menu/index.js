/* eslint-disable brace-style */
import React, { useEffect, useRef, useState } from 'react';

import { RiMenuLine } from 'react-icons/ri';
import ListMenu from './ListMenu';
import './styles.scss';

function Menu() {
  const [visible, setVisible] = useState(false);
  const [clickAway, setClickAway] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    if (clickAway) {
      setClickAway(false);
      setVisible(false);
    }
  }, [clickAway]);

  return (
    <div ref={menuRef} className="menu">
      <RiMenuLine onClick={() => setVisible(!visible)} className="btn" />
      { visible && <ListMenu setVisible={setVisible} setClickAway={setClickAway} menuRef={menuRef} /> }
    </div>
  );
}

// == Export
export default React.memo(Menu);

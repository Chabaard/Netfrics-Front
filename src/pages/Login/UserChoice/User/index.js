/* eslint-disable brace-style */
/* eslint-disable block-spacing */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { UserContext } from '../../../../context/UserContext';

import './styles.scss';

function User({user}) {
  const navigate = useNavigate();
  const { setCookies, deleteUser, editMod } = useContext(UserContext);

  function setUser() {
    if (!editMod)
    {
      setCookies('user', user);
      navigate('/');
    }
  }

  return (
    <article key={user.id} className={`user ${editMod && 'shake'}`} onClick={setUser} style={{animationDelay: Math.random()+'s'}} >
      <div className="picture" style={{ backgroundImage: `url("${process.env.REACT_APP_API_URL}img/profil/${user.picture}")` }}>
        {editMod && <RiDeleteBinLine onClick={() => deleteUser(user.id)} className="trash red" type="button" />}
      </div>
      <p className="name"> {user.login} </p>
    </article>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

// == Export
export default React.memo(User);

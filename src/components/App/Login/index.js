/* eslint-disable brace-style */
/* eslint-disable block-spacing */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { setUserData, setUsersData } from '../../../actions';

import { closeModal } from '../../../utils/modal';
import { request } from '../../../utils/request';
import Signup from './Signup';
import './styles.scss';

function Login() {
  console.log('login');
  const [cookieUser, setCookieUser] = useCookies(['user']);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [listUsers, setListUsers] = useState();

  async function setUser(id) {
    closeModal(dispatch);
    const userFind = await listUsers.filter((u) => u.id === id)[0];
    setCookieUser('user', userFind);
    dispatch(setUserData(userFind));
  }
  async function trashAction(id) {
    if (window.confirm("Ëtes-vous sûr de vouloir supprimer l'utilisateur ?")) {
      await request.delete('user', id);
      dispatch(setUsersData(await request.get('listusers')));
    }
    return null;
  }
  useEffect(() => {
    async function users() {
      const response = await request.get(`listusers`);
      setListUsers(response);
    }
    users();
    if (cookieUser.user && listUsers) {
      setUser(cookieUser.user.id);
    }
  });
  return (
    <div className="user-choice">
      <h3 className="title">Qui es-tu?</h3>
      <div className="list-users">
        { listUsers
          ? listUsers.map((u) => (
            <div key={u.id} className="container">
              <div className="user" onClick={() => {setUser(u.id); navigate('/accueil');}}>
                <div className="picture" style={{ backgroundImage: `url("${process.env.REACT_APP_API_URL}img/profil/${u.picture}")` }} />
                <p className="login"> {u.login} </p>
              </div>
              <button onClick={() => trashAction(u.id)} className="trash" type="button"> </button>
            </div>
          ))
          : '' }
      </div>
      <h3 className="create" onClick={() => setOpen(!open)}>Créer un compte ?</h3>
      {
        open
          ? <Signup setOpen={setOpen} />
          : ''
      }
    </div>
  );
}

// == Export
export default React.memo(Login);

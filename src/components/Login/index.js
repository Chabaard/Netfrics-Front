/* eslint-disable brace-style */
/* eslint-disable block-spacing */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { request } from '../../utils/request';
import Signup from './Signup';
import './styles.scss';
import Loader from '../Loader';

function Login() {
  const [cookieUser, setCookieUser] = useCookies(['user']);
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const [listUsers, setListUsers] = useState();

  async function setUserList() {
    const response = await request.get('listusers');
    if (response) {
      setListUsers(response);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setListUsers(null);
      setOpen(true);
    }
  }
  async function setUser(id) {
    const userFind = await listUsers.filter((u) => u.id === id)[0];
    setCookieUser('user', userFind);
  }
  async function trashAction(id) {
    if (window.confirm("Ëtes-vous sûr de vouloir supprimer l'utilisateur ?")) {
      const response = await request.delete('user', id);
      setIsLoading(true);
      if (response) {
        setUserList();
      }
    }
    return null;
  }

  useEffect(() => {
    setUserList();
    if (cookieUser.user && listUsers) {
      setUser(cookieUser.user.id);
    }
  }, []);
  return (loading ? <Loader />
    : (
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
            ? <Signup setOpen={setOpen} {...{ refreshUserList: setUserList }} />
            : ''
        }
      </div>
    )
  );
}

// == Export
export default React.memo(Login);

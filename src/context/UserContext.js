/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { request } from '../utils/request';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router';

const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(['user']);
  const [editMod, setEditMod] = useState(false);
  const location = useLocation();


  async function updateUsers() {
    const response = await request.get('listusers');
    setUsers(response);
    setIsLoad(true);
    return response;
  }

  async function createUser(formData) {
    const response = await request.post('user', formData);
    if (response) {
      updateUsers();
    }
  }

  async function deleteUser(id) {
    if (window.confirm("Ëtes-vous sûr de vouloir supprimer l'utilisateur ?")) {
      const response = await request.delete('user', id);
      if (response) {
        updateUsers();
      }
    }
  }
  async function removeUserCookie() {
    removeCookies('user');
  }

  useEffect(() => {
    console.log(users)
    console.log(isLoad)
    if (cookies.user && users && !users.filter((user) => Number(user.id) === Number(cookies.user.id))[0]) {
      removeUserCookie();
    }
    if (cookies.user && !users && isLoad) {
      removeUserCookie();
    }

  }, [users, isLoad])

  useEffect(() => {
    updateUsers();
  }, [cookies.user, location.pathname])

  useEffect(() => {
    updateUsers();
  }, [])
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values, object-curly-newline
    <UserContext.Provider value={{ updateUsers, users, isLoad, setCookies, deleteUser, editMod, setEditMod, createUser, removeUserCookie }}>
      {children}
    </UserContext.Provider>
  );
}
UserProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
export { UserContext, UserProvider };

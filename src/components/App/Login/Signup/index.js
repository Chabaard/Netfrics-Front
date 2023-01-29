/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { request } from '../../../../utils/request';
import './styles.scss';
import { setUsersData } from '../../../../actions';

function Signup({ setOpen }) {
  const dispatch = useDispatch();
  const formData = new FormData();

  function handleFileSelected(e) {
    formData.set(e.target.name, e.target.files[0]);
  }
  function handleLoginSelected(e) {
    formData.set(e.target.name, e.target.value);
  }
  async function submit(e) {
    e.preventDefault();
    await request.post('user', formData);
    dispatch(setUsersData(await request.get('listusers')));
    setOpen(false);
  }

  return (
    <form className="form-create-user" onSubmit={submit}>
      <label className="form-label" htmlFor="login">
        Pseudo
        <input className="input-text" onChange={handleLoginSelected} type="text" name="login" required />
      </label>
      <label className="form-label" htmlFor="login">
        Photo de Profil
        <input className="input-text" onChange={handleFileSelected} type="file" name="picture" accept="image/png, image/jpeg, image/jpg" required />
      </label>
      <input className="form-submit input-button" type="submit" value="Envoyer" />
    </form>
  );
}

Signup.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

// == Export
export default React.memo(Signup);

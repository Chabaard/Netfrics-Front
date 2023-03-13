/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../../context/UserContext';
import './styles.scss';

function Signup({ setOpen }) {
  const formData = new FormData();
  const { createUser } = useContext(UserContext);

  function handleFileSelected(e) {
    formData.set(e.target.name, e.target.files[0]);
  }
  function handleLoginSelected(e) {
    formData.set(e.target.name, e.target.value);
  }
  async function submit(e) {
    e.preventDefault();
    createUser(formData);
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

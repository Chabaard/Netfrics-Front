/* eslint-disable brace-style */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { UrlContext } from '../../context/UrlContext'
import styles from './styles.module.scss';

function Url() {
  const [url, setUrl] = useState("https://192.168.1.11:5001")
  const {createUrl} = useContext(UrlContext);
  const [err, setErr] = useState()

  const handlerUrl = (e) => {
    setUrl(e.target.value);
  }

  const handlerValidate = async () => {
    const response = await createUrl(url);
    if (!response) setErr('Url invalide.')
    else setErr(null)
  }

  const handlerTest = async () => {
    const response = await createUrl(url);
    if (!response) setErr('Url invalide.')
    else setErr(null)
  }

  return (
    <div className={styles.config}>
      <h2 className={styles.h2}> Configuration </h2>
      <p>L'url attendu est du type 192.168.1.x:5001 ou bien un nom de domaine par exemple https://rcweb.fr</p>
      <p>Cette url permet de récupérer les données attendues afin d'afficher les fichiers voir documentation sur l'api.</p>
      <p>La valeur par défaut généralement utilisé est:</p>
      <p className={styles.copy}>http://localhost:5001</p>
      <input type="text" placeholder="Url" value={url} onChange={handlerUrl} />
      <button onClick={handlerValidate}> Valider </button>
      <button onClick={handlerTest}> Voir un test </button>
      {err && err}
    </div>
  );
}

Url.propTypes = {
  login: PropTypes.string,
};
Url.defaultProps = {
  login: null,
};

// == Export
export default React.memo(Url);

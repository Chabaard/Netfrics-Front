/* eslint-disable brace-style */
/* eslint-disable block-spacing */
import React, { useContext, useEffect, useState } from 'react';

import Signup from './Signup';
import Loader from '../../components/Loader';
import UserChoice from './UserChoice';
import { UserContext } from '../../context/UserContext';
import './styles.scss';
import { RiEdit2Fill } from 'react-icons/ri';

function Login() {
  const { updateUsers, users, isLoad, setEditMod, editMod } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const onClickEdit = () => {
    if (!open) setEditMod(!editMod)
  }

  const onClickChangeMenu = () => {
    setOpen(!open);
    setEditMod(false);
  }
  useEffect(() => {
    if (isLoad && !users) {
      setOpen(true);
      setEditMod(false)
    } else {
      setOpen(false);
    }
  }, [users])

  return (
    <section className="body-login">
      <div className="login">
        {!isLoad ? <Loader />
        : (<>
            {
              open 
              ? (
                <>
                  <h2 className="title">Création de profil</h2> 
                  <Signup setOpen={setOpen} updateUsers={updateUsers} /> 
                  {users && <h3 className="bottom-title" onClick={onClickChangeMenu}>J'ai déjà un profil.</h3>}
                </>)

                : (
                <>
                  <RiEdit2Fill className={`edit ${editMod && 'red'}`} onClick={onClickEdit} />
                  <h2 className="title">Qui voilà ?</h2> 
                  <UserChoice updateUsers={updateUsers} users={users} />
                  <h3 className="bottom-title" onClick={onClickChangeMenu}>Créer un profil ?</h3>
                </>)
            }

          </>
        )}
      </div>
    </section>
  );
}

// == Export
export default React.memo(Login);

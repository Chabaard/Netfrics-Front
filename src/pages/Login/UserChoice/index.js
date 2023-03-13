/* eslint-disable brace-style */
/* eslint-disable block-spacing */
import React, { useContext } from 'react';
import User from './User';
import { UserContext } from '../../../context/UserContext';

import './styles.scss';

function UserChoice() {
  const { users } = useContext(UserContext);

  return (
      <main className="user-choice">
        <section className="list-users">
          { users && users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </section>
      </main>
    )
}

// == Export
export default React.memo(UserChoice);

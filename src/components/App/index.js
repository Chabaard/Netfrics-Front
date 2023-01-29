/* eslint-disable quotes */
// == Import
import './styles.scss';
import React from 'react';
import Modal from 'react-modal';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setMoviesData, setSeriesData, setUsersData } from '../../actions';
import { request } from '../../utils/request';

// COMPONENTS
import NavBar from './NavBar';
import Body from './Body';
import NotFound from './404';
import Play from './Play';
import Admin from './Admin';
import Login from './Login';

Modal.setAppElement('body');

// == Composant
function App() {
  console.log('app');
  const [cookieUser] = useCookies(['user']);
  const user = useSelector((state) => state.user);
  const modalIsOpen = useSelector((state) => state.modalIsOpen);
  const dispatch = useDispatch();

  const app = {
    async Users() {
      const response = await request.get(`listusers`);
      dispatch(setUsersData(response));
    },
    async Movies() {
      const response = await request.get(`listmovies/${user.id}`);
      console.log('reload movies');
      dispatch(setMoviesData(response));
    },
    async Series() {
      const response = await request.get(`listseries/${user.id}`);
      response[0].name = 'Séries';
      console.log('reload series');
      dispatch(setSeriesData(response[0]));
    },
  };
  app.Users();
  if (user) {
    app.Movies();
    app.Series();
  }

  return (
    <main className="app">
      { user && !modalIsOpen ? <NavBar {...user} /> : '' }
      <Routes>
        <Route
          path="/"
          element={(
            // <Modal id="modal" isOpen={modalIsOpen}>
            <Login />
            // </Modal>
          )}
        />
        { user
          ? (
            <>
              <Route path="/accueil" element={<> <Body path="all" /></>} />
              <Route path="/admin" element={<> <Admin /></>} />
              <Route path="/admin/:adminPanel" element={<> <Admin /></>} />
              <Route path="/films" element={<> <Body path="movies" /></>} />
              <Route path="/series" element={<> <Body path="series" /></>} />
              <Route path="/mangas" element={<> <Body path="mangas" /></>} />
              <Route path="/:type/:id" element={<> <Play /> </>} />
            </>
          )
          : '' }
        <Route path="/*" element={<> <NotFound {...user} /> { !user ? <Login /> : 'efzef'} </>} />
      </Routes>
    </main>
  );
}

// == Export
export default React.memo(App);

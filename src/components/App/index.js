// == Import
import './styles.scss';
import React from 'react';
import Modal from 'react-modal';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMoviesData, setSeriesData, setUsersData } from '../../actions';
import { request } from '../../utils/request';

// COMPONENTS
import NavBar from './NavBar';
import Body from './Body';
import NotFound from './404';
import PlaySerie from './PlaySerie';
import Admin from './Admin';
import Login from './Login';

Modal.setAppElement('body');

// == Composant
function App() {
  const user = useSelector((state) => state.user);
  const modalIsOpen = useSelector((state) => state.modalIsOpen);
  const dispatch = useDispatch();

  function dispatcher() {
    async function Users() {
      const response = await request.get('listusers');
      dispatch(setUsersData(response));
    }

    async function Movies() {
      const response = await request.get('listmovies');
      dispatch(setMoviesData(response));
    }

    async function Series() {
      const response = await request.get('listseries');
      response[0].name = 'Séries';
      dispatch(setSeriesData(response[0]));
    }
    Users();
    if (user) {
      Movies();
      Series();
    }
  }
  dispatcher();

  return (
    <main className="app">
      { user && !modalIsOpen ? <NavBar {...user} /> : '' }
      <Routes>
        <Route path="/" element={<> <Modal id="modal" isOpen={modalIsOpen}><Login /></Modal></>} />
        { user
          ? (
            <>
              <Route path="/accueil" element={<> <Body path="all" /></>} />
              <Route path="/admin" element={<> <Admin /></>} />
              <Route path="/films" element={<> <Body path="movies" /></>} />
              <Route path="/series" element={<> <Body path="series" /></>} />
              <Route path="/mangas" element={<> <Body path="mangas" /></>} />
              <Route path="/:type/:id" element={<> <PlaySerie /> </>} />
            </>
          )
          : '' }
        <Route path="/*" element={<> <NotFound {...user} /> </>} />
      </Routes>
    </main>
  );
}

// == Export
export default React.memo(App);

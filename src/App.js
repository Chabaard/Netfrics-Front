/* eslint-disable quotes */
// == Import
import './styles.scss';
import React, { useContext, useEffect } from 'react';
// eslint-disable-next-line object-curly-newline
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// COMPONENTS
import NavBar from './components/NavBar';
import NotFound from './pages/404';
import Play from './components/Play';
import Admin from './pages/Admin';
import Search from './pages/Search';
import Login from './pages/Login';
import Accueil from './pages/Accueil';
import { VideoDataContext } from './context/VideoDataContext';
import { VideoProvider } from './context/VideoContext';
import { UserProvider } from './context/UserContext';

// == Composant
function App() {
  const { saveUserVideoData, resetContext, videoInfos } = useContext(VideoDataContext);
  const [cookies] = useCookies(['user']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (videoInfos) {
      saveUserVideoData();
      resetContext();
    }
    navigate(location.pathname);
  }, [location.pathname, navigate]);


  return (
    <main className="app">
      { cookies.user
        ? (
          <>
            <NavBar {...cookies.user} />
            <VideoProvider>
              <Routes>
                <Route path="/" element={<> <Accueil path="all" /></>} />
                <Route path="/accueil" element={<> <Accueil path="all" /></>} />
                <Route path="/admin" element={<> <Admin /></>} />
                <Route path="/admin/:adminPanel" element={<> <Admin /></>} />
                <Route path="/movies" element={<> <Accueil /></>} />
                <Route path="/series" element={<> <Accueil /></>} />
                <Route path="/search" element={<> <Search /></>} />
                <Route path="/play/:type/:id" element={<> <Play /> </>} />
                <Route path="/play/:type/:id/:epId" element={<> <Play /> </>} />
                <Route path="/*" element={<> <NotFound {...cookies.user} /> </>} />
              </Routes>
            </VideoProvider>
          </>
        )
        : (
          <UserProvider>
            <Login />
          </UserProvider>
        )
        }
    </main>
  );
}

// == Export
export default React.memo(App);

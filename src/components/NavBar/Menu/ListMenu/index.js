/* eslint-disable max-len */
/* eslint-disable brace-style */
import React, { useContext, useEffect } from 'react';

import PropTypes from 'prop-types';
import { RiFilmLine, RiHomeLine, RiListSettingsFill, RiShuffleFill, RiStarLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { VideoContext } from '../../../../context/VideoContext';

function ListMenu({ setClickAway, setVisible, menuRef }) {
  const navigate = useNavigate();
  const { getRandomVideo } = useContext(VideoContext);

  const navToRandomVideo = async () => {
    const randomVideo = await getRandomVideo();
    if (randomVideo) {
      if (randomVideo.type === "movies") {  
        navigate(`/play/${randomVideo.type}/${randomVideo.movie.id}`);
      } else if (randomVideo.type === "series") {  
        navigate(`/play/${randomVideo.type}/${randomVideo.series.id}/0`);
      }
      setVisible(false);
    }
  }

  useEffect(() => {
    const onPointerUp = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setClickAway(true);
      }
    };
    document.addEventListener('pointerup', onPointerUp);
    return () => document.removeEventListener('pointerup', onPointerUp);
  }, []);
  return (
    <div className="list-menu">
      <div className="link" onClick={() => { navigate('/'); setVisible(false); }}>
        <RiHomeLine />
        <h2>Accueil</h2>
      </div>
      <div className="link" onClick={() => { navigate('/movies'); setVisible(false); }}>
        <RiFilmLine />
        <h2>Films</h2>
      </div>
      <div className="link" onClick={() => { navigate('/series'); setVisible(false); }}>
        <RiFilmLine />
        <h2>Séries</h2>
      </div>
      <div className="link" onClick={navToRandomVideo}>
        <RiShuffleFill />
        <h2>Aléatoire</h2>
      </div>
      <div className="link" onClick={() => { navigate('/favorite'); setVisible(false); }}>
        <RiStarLine />
        <h2>Favoris</h2>
      </div>
      <div className="link" onClick={() => { navigate('/admin'); setVisible(false); }}>
        <RiListSettingsFill />
        <h2>Admin</h2>
      </div>
    </div>
  );
}
ListMenu.propTypes = {
  setVisible: PropTypes.func.isRequired,
  setClickAway: PropTypes.func.isRequired,
  menuRef: PropTypes.any.isRequired,
};
// == Export
export default React.memo(ListMenu);

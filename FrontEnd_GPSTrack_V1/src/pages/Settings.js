import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setId } from '../feature/userIdSlice';
import Header from '../components/Layout/Header';
import Loader from '../components/Other/Loader';
import { deleteUser } from '../services/UserApi';
import Token from '../services/Token';
import { setIsAuth } from '../feature/useAuthSlice';
import Footer from '../components/Layout/Footer';

const Settings = () => {
  const uid = useSelector((state) => state.userId.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Logout
  const handleLogout = async () => {
    Token.removeToken();
    dispatch(setIsAuth(null));
    setTimeout(() => {
      navigate('/auth', { replace: true });
    }, 500);
  };

  //Delete user
  const handleDelete = async () => {
    await deleteUser(uid)
      .then((res) => {
        console.log(res);
      })
      .then(dispatch(setId(null)))
      .then(navigate('/redirect', { replace: true }));
  };

  return (
    <div className='settings'>
      <Header />
      <div className='settingsContainer'>
        {uid === null ? (
          <Loader />
        ) : (
          <>
            <div className='profil'>
              Profil
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className='account'>
              {' '}
              <button onClick={handleDelete}>Delete profil</button>Account
            </div>
            <div className='tracks'>Tracks</div>
            <div className='friends'>Friends</div>
            <div className='about'>About</div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Settings;

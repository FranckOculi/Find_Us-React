import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../pages/Auth';

import Loader from '../components/other/Loader';
import UseAuth from '../hooks/UseAuth';
import UserInfos from '../hooks/UserInfos';
import { tryToConnect } from '../services/AuthApi';
import Token from '../services/Token';
import { isEmpty } from '../utils/Utils';

const AuthManager = () => {
  const navigate = useNavigate();

  const [isLoad, setIsLoad] = useState(false);
  const [ok, setOk] = useState(false);
  const { isAuth, changeAuthStatus } = UseAuth();
  const { userData, loadUserData, userId, loadUserId } = UserInfos();
  const token = Token.getToken();

  const autoConnect = async () => {
    return await tryToConnect()
      .then((res) => {
        loadUserId(res.data.data.userId);
        // loadMe(res.data.data.userId);
        changeAuthStatus(true);
      })
      .catch((err) => {
        return navigate('/auth');
      });
  };

  useEffect(() => {
    if (!token) setOk(true);
    if (token) {
      autoConnect();
    }
  }, []);

  useEffect(() => {
    if (isAuth & isEmpty(userData) & !isLoad) {
      loadUserData();
      setIsLoad(!isLoad);
    }

    if (isAuth && userId) navigate('/');
  }, [isAuth, userData]);

  if (ok) {
    return (
      <>
        <Auth />
      </>
    );
  }

  return <Loader />;
};
export default AuthManager;

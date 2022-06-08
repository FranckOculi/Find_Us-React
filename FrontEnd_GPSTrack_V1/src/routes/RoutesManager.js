import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Tuto from '../pages/Tuto';
import Loader from '../components/other/Loader';
import UseAuth from '../hooks/UseAuth';
import UserInfos from '../hooks/UserInfos';
import { tryToConnect } from '../services/AuthApi';
import Token from '../services/Token';
import { isEmpty } from '../utils/Utils';

const RoutesManager = () => {
  const navigate = useNavigate();

  const [isLoad, setIsLoad] = useState(false);
  const [ok, setOk] = useState(false);
  const { isAuth, changeAuthStatus, isTuto, loadUserData } = UseAuth();
  const { userData, userId, loadUserId } = UserInfos();
  const token = Token.getToken();

  const autoConnect = async () => {
    return await tryToConnect()
      .then((res) => {
        loadUserId(res.data.data.userId);
        changeAuthStatus(true);
      })
      .catch((err) => {
        console.log('app : No token');
        return navigate('/auth');
      });
  };

  useEffect(() => {
    if (!token) navigate('/auth');
    if (token) {
      autoConnect();
    }
  }, []);

  useEffect(() => {
    if (isAuth && userId) setOk(true);
    if (isAuth & isEmpty(userData.user) & !isLoad) {
      loadUserData();
      setIsLoad(!isLoad);
    }
  }, [isAuth, userData]);

  if (ok & isTuto) {
    return <Tuto />;
  }

  if (ok & !isTuto) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return <Loader />;
};

export default RoutesManager;

import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth, setIsTuto } from '../feature/useAuthSlice';

import { useNavigate } from 'react-router-dom';
import Token from '../services/Token';
import { signInApi, signUpApi } from '../services/AuthApi';
import { getMe } from '../services/UserApi';
import { setId } from '../feature/userIdSlice';
import UserInfos from '../hooks/UserInfos';
import UseGroups from '../hooks/UseGroups';
import UseFriends from './UseFriends';

export default function UseAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.useAuth.isAuth);
  const isTuto = useSelector((state) => state.useAuth.isTuto);
  const { userId, loadUser } = UserInfos();
  const { loadGroupsData } = UseGroups();
  const { loadFriendsData } = UseFriends();

  const changeAuthStatus = (value) => {
    dispatch(setIsAuth(value));
  };

  const changeTutoStatus = () => {
    dispatch(setIsTuto(!isTuto));
  };

  const createAccount = async (signUpData) => {
    await signUpApi(signUpData).then((res) => {
      if (!res.err) {
        const data = {
          mail: signUpData.mail,
          motDePasse: signUpData.motDePasse,
        };
        changeTutoStatus();
        login(data);
      } else {
        throw new Error('error');
      }
    });
  };

  const login = async (data) => {
    await signInApi(data).then((res) => {
      if (!res.err) {
        loadData(res);
      }
    });
  };

  const loadData = (res) => {
    const token = res.data.data.token;
    const userId = res.data.data.user;
    Token.setToken(token);
    dispatch(setId(userId));
    dispatch(setIsAuth(true));
    navigate('/', { replace: true });
  };

  //load all user data
  const loadUserData = async () => {
    return await getMe(userId).then(({ data }) => {
      if (data?.userData?.user) {
        loadUser(data.userData.user);
      }
      if (data?.userData?.groups) {
        loadGroupsData(userId, data.userData.groups);
      }
      if (data?.userData?.friends) {
        loadFriendsData(data.userData.friends);
      }
    });
  };

  return {
    isAuth,
    isTuto,
    changeAuthStatus,
    login,
    createAccount,
    changeTutoStatus,
    loadUserData,
  };
}

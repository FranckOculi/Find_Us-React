import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsAuth, setIsTuto } from '../feature/user/userAuthSlice';
import { setId } from '../feature/user/userIdSlice';
import { clearInfos } from '../feature/user/userInfosSlice';
import { clearGroupStore } from '../feature/group/groupsSlice';
import { removeMemberStore } from '../feature/group/groupSingleMembersSlice';
import { clearAllMembers } from '../feature/group/groupsMembersSlice';
import { clearAllPositions } from '../feature/group/groupPositionsSlice';
import { removeSelectedGroup } from '../feature/group/groupSelectedSlice';
import { setPosition } from '../feature/position/positionSlice';
import { clearFriends } from '../feature/friend/friendsIdSlice';
import UserInfos from './UserInfos';
import UseGroups from './UseGroups';
import UseFriends from './UseFriends';
import { signInApi, signUpApi } from '../services/AuthApi';
import { getMe } from '../services/UserApi';
import Token from '../services/Token';

export default function UserAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.userAuth.isAuth);
  const isTuto = useSelector((state) => state.userAuth.isTuto);
  const { userId, loadUser } = UserInfos();
  const { loadGroupsData } = UseGroups();
  const { loadFriendsId } = UseFriends();

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

  const logout = () => {
    dispatch(setIsAuth(null));
    dispatch(setIsTuto(null));
    dispatch(setId(null));
    dispatch(clearInfos(null));
    dispatch(clearGroupStore(1));
    dispatch(clearAllMembers(0));
    dispatch(removeMemberStore(0));
    dispatch(removeSelectedGroup());
    dispatch(setPosition(0));
    dispatch(clearAllPositions());
    dispatch(clearFriends(0));
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
      if (data?.userData?.groups[0]) {
        loadGroupsData(userId, data.userData.groups);
      }
      if (data?.userData?.friends[0]) {
        loadFriendsId(data.userData.friends);
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
    logout,
  };
}

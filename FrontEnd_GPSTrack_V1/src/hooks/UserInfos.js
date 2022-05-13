import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, getMe } from '../services/UserApi';
import { setInfos } from '../feature/userInfosSlice';
import { setId } from '../feature/userIdSlice';

export default function UserInfos() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userInfos);
  const userId = useSelector((state) => state.userId.id);

  //load user id
  const loadUserId = (id) => {
    dispatch(setId(id));
  };

  // //Load user data
  const loadUser = (data) => {
    dispatch(setInfos(data));
  };

  // const loadUserData = async () => {
  //   return await getUserInfo(userId).then(({ data }) => {
  //     // user infos
  //     if (!isEmpty(data.userInfos)) {
  //       dispatch(setInfos(data.userInfos));
  //     }
  //   });
  // };

  // //load user data
  // const fetchMe = async () => {
  //   return await loadMe(userId).then((res) => {
  //     console.log(res);
  //     for (let i = 0; i < res.data.userData.membres.length; i++) {
  //       test.push(res.data.userData.membres[i].groupeCode.toString());
  //     }
  //   });
  // };

  return { userData, loadUser, userId, loadUserId };
}

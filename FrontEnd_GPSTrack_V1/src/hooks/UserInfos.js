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

  return { userData, loadUser, userId, loadUserId };
}

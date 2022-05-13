import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../feature/userFriendsSlice';
import { getAllFriends, addFriend } from '../services/FriendApi';
import { getShortUserInfo } from '../services/UserApi';
import { isEmpty } from '../utils/Utils';

export default function UseFriends() {
  const dispatch = useDispatch();
  const friendsData = useSelector((state) => state.userFriends);

  //Load All friendsId
  const loadFriendsData = async (data) => {
    let i = 0;
    do {
      dispatch(setFriends(data[i].recepteurUserId));
      i++;
    } while (i < data.length);
    // const friendsId = [];
    // await getAllFriends(userId).then((res) => {
    //   if (!isEmpty(res.data.friends)) {
    //     let i = 0;
    //     do {
    //       friendsId.push(res.data.friends[i].recepteurUserId);
    //       i++;
    //     } while (i < res.data.friends.length);
    //   }
    // });
    // return friendsId;
  };

  //Load All friends firstName
  const loadFriendsNameData = async (friendsId) => {
    if (!isEmpty(friendsId)) {
      let i = 0;
      do {
        getShortUserInfo(friendsId[i]).then((res) => {
          dispatch(setFriends(res.data.shortUserInfo[0]));
        });
        i++;
      } while (i < friendsId.length);
    }
  };

  //fetch friend firstName
  const fetchNameMember = async (id) => {
    return await getShortUserInfo(id);
  };

  const fetchShortFriendInfo = async (friendsId) => {
    return await getShortUserInfo(friendsId);
  };

  const addNewFriend = async (userId, data) => {
    return await addFriend(userId, data);
  };

  return {
    friendsData,
    loadFriendsData,
    loadFriendsNameData,
    addNewFriend,
    fetchShortFriendInfo,
    fetchNameMember,
  };
}

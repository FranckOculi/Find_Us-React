import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../feature/friend/friendsIdSlice';
import { setFriendsData } from '../feature/friend/friendsDataSlice';
import {
  getAllFriends,
  addFriend,
  getFriendsData,
} from '../services/FriendApi';
import { getShortUserInfo } from '../services/UserApi';
import { isEmpty } from '../utils/Utils';

export default function UseFriends() {
  const dispatch = useDispatch();
  const friendsId = useSelector((state) => state.friendsId);
  const friendsData = useSelector((state) => state.friendsData);

  //Load All friendsId
  const loadFriendsId = async (data) => {
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

  const loadFriendsData = async (id, data) => {
    return await getFriendsData(data, id).then((res) => {
      if (res?.data?.friendsData) {
        let i = 0;
        do {
          dispatch(setFriendsData(res.data.friendsData[i]));
          i++;
        } while (i < res.data.friendsData.length);
      }
    });
  };

  //Load All friends firstName
  // const loadFriendsNameData = async (friendsId) => {
  //   if (!isEmpty(friendsId)) {
  //     let i = 0;
  //     do {
  //       getShortUserInfo(friendsId[i]).then((res) => {
  //         dispatch(setFriends(res.data.shortUserInfo[0]));
  //       });
  //       i++;
  //     } while (i < friendsId.length);
  //   }
  // };

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
    friendsId,
    loadFriendsData,
    loadFriendsId,
    addNewFriend,
    fetchShortFriendInfo,
    fetchNameMember,
    friendsData,
  };
}

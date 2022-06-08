import axios from 'axios';
import Token from './Token';

export const getAllFriends = async (id) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/friend/${id}/friends`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

export const getFriendsEvent = async (id, codeEvent) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/friend/${id}/${codeEvent}/friends`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

export const addFriend = async (id, friendId) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/friend/${id}/${friendId}/add`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

export const getFriendsData = async (data, id) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/friend/${id}/friendsData`,
    withCredentials: true,
    data,
  });
};

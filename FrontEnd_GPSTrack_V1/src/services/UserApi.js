import axios from 'axios';
import Token from './Token';

export const deleteUser = async (id) => {
  return await axios({
    method: 'DELETE',
    url: `http://localhost:3000/user/${id}/delete`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

export const getUserInfo = async (id) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/user/${id}`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

export const getMe = async (id) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/user/${id}/me`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

export const getShortUserInfo = async (id) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/user/${id}/short`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

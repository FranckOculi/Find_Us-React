import axios from 'axios';
import Token from './Token';

export const getGroups = async (id, data) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/event/${id}/groups`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
    data,
  });
};

export const getMembers = async (id, codeGroup) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/event/${id}/${codeGroup}/members`,
    withCredentials: true,
  });
};

export const addGroup = async (id, data) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/event/${id}/group`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
    data,
  });
};

export const deleteGroup = async (id, codeGroup) => {
  return await axios({
    method: 'DELETE',
    url: `http://localhost:3000/event/${id}/${codeGroup}/delete`,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

export const getAllMembers = async (id, data) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/event/${id}/members`,
    headers: {
      authorization: Token.getToken(),
    },
    data,
  });
};

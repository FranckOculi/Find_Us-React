import axios from 'axios';
import Token from './Token';

/*  Groups  */
export const getGroups = async (id, data) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/group/${id}/groups`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
    data,
  });
};

export const addGroup = async (id, data) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/group/${id}/group`,
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
    url: `http://localhost:3000/group/${id}/${codeGroup}/delete`,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

/*  Members  */
export const getAllMembers = async (id, data) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/group/${id}/members`,
    headers: {
      authorization: Token.getToken(),
    },
    data,
  });
};

export const getMembers = async (id, codeGroup) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/group/${id}/${codeGroup}/members`,
    withCredentials: true,
  });
};

export const addGroupMember = async (id, codeGroup) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/group/${id}/${codeGroup}/member`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

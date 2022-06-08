import axios from 'axios';
import Token from './Token';

/*  Groups  */
export const getGroups = async (id, data) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/group/${id}/${data}/groups`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
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
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

/*  Members  */
export const getMembers = async (id, codeGroup) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/group/${id}/${codeGroup}/members`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
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

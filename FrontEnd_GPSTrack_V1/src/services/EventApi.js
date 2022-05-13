import axios from 'axios';
import Token from './Token';

export const getAllEvents = async (id) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/event/${id}/events`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
};

export const addEvent = async (id, data) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/event/${id}/event`,
    withCredentials: true,
    data,
  });
};

export const removeEvent = async (id, codeEvent) => {
  return await axios({
    method: 'DELETE',
    url: `http://localhost:3000/event/${id}/${codeEvent}/delete`,
    withCredentials: true,
  });
};

export const updateMember = async (id, codeEvent, friendId) => {
  return await axios({
    method: 'PUT',
    url: `http://localhost:3000/event/${id}/${codeEvent}/${friendId}/update`,
    withCredentials: true,
  });
};

export const addInvitation = async (codeEvent, data) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/event/${codeEvent}/invitation`,
    withCredentials: true,
    data,
  });
};

export const getInvitation = async (codeEvent) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/event/${codeEvent}/invitation`,
    withCredentials: true,
  });
};

export const getAllInvitations = async (id) => {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/event/${id}/invitations`,
    withCredentials: true,
  });
};

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

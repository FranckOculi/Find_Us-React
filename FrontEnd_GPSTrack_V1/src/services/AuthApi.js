import axios from 'axios';

export const signInApi = async (data) => {
  return await axios({
    method: 'POST',
    url: 'http://localhost:3000/auth/login',
    withCredentials: true,
    data,
  });
};

export const signUpApi = async (data) => {
  return await axios({
    method: 'POST',
    url: 'http://localhost:3000/auth/register',
    withCredentials: true,
    data,
  });
};

export const tryToConnect = async () => {
  return await axios({
    method: 'GET',
    url: 'http://localhost:3000/auth/jwtid',
    withCredentials: true,
  });
};

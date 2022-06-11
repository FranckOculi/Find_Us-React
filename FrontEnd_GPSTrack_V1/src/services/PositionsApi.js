import axios from 'axios';
import Token from './Token';

// const getPositions = async (id, codeEvent) => {
//   return await axios({
//     method: 'GET',
//     url: `http://localhost:3000/position/${id}/${codeEvent}/positions`,
//     withCredentials: true,
//     headers: {
//       authorization: Token.getToken(),
//     },
//   });
// };

export async function getPosition(id) {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/position/${id}/lastposition`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
}

export async function addCurrentPosition(id, data) {
  return await axios({
    method: 'POST',
    url: `http://localhost:3000/position/${id}/position`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
    data,
  });
}

export async function getGroupsPositions(id, data) {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/position/${id}/${data}/lastpositions`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
}

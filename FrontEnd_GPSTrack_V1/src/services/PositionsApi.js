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

export async function getLastPosition(id, codeEvent) {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/position/${id}/${codeEvent}/lastposition`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
}

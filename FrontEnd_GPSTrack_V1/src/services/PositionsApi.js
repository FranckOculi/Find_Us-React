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

export async function getLastPosition(id, codeGroup) {
  return await axios({
    method: 'GET',
    url: `http://localhost:3000/position/${id}/${codeGroup}/lastpositions`,
    withCredentials: true,
    headers: {
      authorization: Token.getToken(),
    },
  });
}

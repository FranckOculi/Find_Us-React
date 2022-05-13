import configuration from '../../config/configuration.js';
import jwt from 'jsonwebtoken';
import { dbServer } from '../../config/db.js';

export function tokenVerification(req, res, done) {
  const tokenObject = req.headers.cookie;
  const token = tokenObject.replace('jwt=', '');

  if (token) {
    jwt.verify(token, configuration.tokenSecret, async (err, decoded) => {
      if (err) {
        return res.code(401).send({ message: 'Token not valid' });
      } else {
        const user = await dbServer
          .select('utilisateurId')
          .from('Utilisateurs')
          .where({ utilisateurId: decoded.userId });
        if (user) {
          req.headers.tokenInfo = {
            authorization: decoded.userId,
          };
          done();
        } else {
          return res.code(401).send({ message: 'Unknown user' });
        }
      }
    });
  } else {
    return res.code(401).send({ message: 'Token required' });
  }
}

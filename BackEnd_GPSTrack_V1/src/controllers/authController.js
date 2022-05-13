import configuration from '../../config/configuration.js';
import { dbServer } from '../../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Token from '../utils/Token.js';

export async function signUp(req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.motDePasse, salt);
    await dbServer
      .insert([
        {
          pseudo: req.body.pseudo,
          mail: req.body.mail,
          motDePasse: hashed,
        },
      ])
      .into('Utilisateurs');
    return res.code(201).send({ message: 'User added !' });
  } catch (error) {
    throw new Error('Unable to complete signup');
  }
}

export async function login(req, res) {
  try {
    const user = await dbServer
      .select('*')
      .from('Utilisateurs')
      .where({ mail: req.body.mail });

    const isValidPassword = await bcrypt.compare(
      req.body.motDePasse,
      user[0].motDePasse,
    );

    if (isValidPassword) {
      const token = Token.createToken(user);

      return res.code(200).send({
        message: 'Authenticate with success !',
        data: {
          user: user[0].utilisateurId,
          token: token,
        },
      });
    } else {
      return res
        .code(401)
        .send({ message: 'That email and password combination is incorrect' });
    }
  } catch (err) {
    return res
      .code(401)
      .send({ message: 'That email and password combination is incorrect' });
  }
}

export function requireAuth(req, res, done) {
  try {
    const tokenObject = req.headers.cookie;
    const token = tokenObject.replace('jwt=', '');
    if (token) {
      jwt.verify(
        token,
        configuration.tokenSecret,
        async (err, decodedToken) => {
          if (err) {
            return res.code(200).send({ message: 'Error : Invalid token' });
          } else {
            return res.code(200).send({
              message: 'Authenticate with success !',
              data: decodedToken,
            });
          }
        },
      );
    } else {
      return console.log('No token');
    }
  } catch (err) {
    return console.log('No token');
  }
}

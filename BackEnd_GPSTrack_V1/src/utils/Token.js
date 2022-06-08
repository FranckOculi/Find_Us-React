import configuration from '../../config/configuration.js';

import jwt from 'jsonwebtoken';

export default class Token {
  constructor() {}

  static options = {
    expiresIn: '1d',
  };

  static createToken = (user) => {
    const token = jwt.sign(
      { userId: user[0].utilisateurId },
      configuration.tokenSecret,
      this.options,
      // this.options,
    );
    return token;
  };

  static verifyToken = async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, configuration.tokenSecret);
    } catch (error) {
      return false;
    }

    return decoded;
  };
}

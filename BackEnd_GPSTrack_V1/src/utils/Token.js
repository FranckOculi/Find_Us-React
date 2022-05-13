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

  static generateUserToken = async (user, expiresIn = '20d') => {
    const role = ['user'];
    if (user.admin) role.push('admin');
    if (user.superAdmin) role.push('superAdmin');

    return jwt.sign(
      {
        userId: user.id,
        organizationId: user.organizationId,
        email: user.email,
        role,
        // scope: ['profile', 'email', 'openid'],
      },
      configuration.jwt_secret,
      {
        expiresIn,
      },
    );
  };

  static verifyToken = async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, configuration.jwt_secret);
    } catch (error) {
      return false;
    }

    return decoded;
  };
}

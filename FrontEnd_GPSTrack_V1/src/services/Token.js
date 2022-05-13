import Cookies from 'js-cookie';
class TokenService {
  getToken() {
    return Cookies.get('jwt');
  }

  setToken(token) {
    return Cookies.set('jwt', token);
  }

  removeToken() {
    return Cookies.remove('jwt', { path: '/' });
  }
}

export default new TokenService();

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    login(user) {
      return axios
        .post(API_URL + 'signin', {
          username: user.username,
          password: user.password,
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem('user');
    }
  
    register(user) {
      return axios.post(API_URL + 'signup', {
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        code:user.code,
        department:user.department,
        gender: user.gender,
      });
    }

  }
  
  export default new AuthService();
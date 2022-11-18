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
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
        });
    }
    logout() {                        
      localStorage.removeItem('user');
    }
  
    register(user) {
      let userForm = new FormData(user)
      console.log(12, user.value);
      return axios.post(API_URL + 'signup', userForm);
    }

    changePassword(data){
        // let formData = new FormData(data);
        return axios.post(API_URL + 'changePassword', data)
    }
    changePasswordForgot(data){
        // let formData = new FormData(data);
        return axios.post(API_URL + 'reset_password-tokenLink', data)
    }

    lockAccount(id){
        return axios.put(API_URL + `lockAccount/${id}`)
    }

  }
  
  export default new AuthService();
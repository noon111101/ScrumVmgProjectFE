
import authHeader from './auth-header';

import httpCommon from "@/http-common";

class UserService {
  getUser_Department(params){
    return httpCommon.get("/user-management/users", {params})
  }
  getPublicContent() {
    return httpCommon.get("/user-management" + 'all');
  }

  getUserBoard() {
    return httpCommon.get("/user-management" + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return httpCommon.get("/user-management"+ 'mod', { headers: authHeader() });
  }


  getAdminBoard() {
    return httpCommon.get("/user-management" + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
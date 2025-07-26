import { API_ENDPOINTS } from "constants/apiEndPoints";

import axios from "axios";

const login = payload =>
  axios.post(API_ENDPOINTS.SESSION, {
    login: payload,
  });

const logout = () => axios.delete(API_ENDPOINTS.SESSION);

const signup = payload =>
  axios.post(API_ENDPOINTS.USERS, {
    user: payload,
  });

const authApi = { signup, logout, login };

export default authApi;

import axios from "axios";

export const login = (loginData) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, {
    email: loginData.email,
    password: loginData.password,
  });
};

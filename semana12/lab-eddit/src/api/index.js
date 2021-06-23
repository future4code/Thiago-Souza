import axios from "axios";

const BASE_URL = "https://labeddit.herokuapp.com";

export function loginUser(user) {
  return axios.post(`${BASE_URL}/users/login`, user);
}

export function singupUser(user) {
  return axios.post(`${BASE_URL}/users/signup`, user);
}

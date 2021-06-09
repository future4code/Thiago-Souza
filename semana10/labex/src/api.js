import axios from "axios";

const URL = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/thiago-felipe";

export function login(body) {
  return axios.post(`${URL}/login`, body);
}

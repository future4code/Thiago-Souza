import axios from "axios";

const STUDENT = "thiago-felipe";
/*eslint-disable-next-line max-len*/
const URL = `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${STUDENT}`;

export function getProfileToChoose() {
  return axios.get(`${URL}/person`);
}

export function getMatches() {
  return axios.get(`${URL}/matches`);
}

export function choosePerson(id, choice) {
  return axios.post(`${URL}/choose-person`, {
    id,
    choice
  });
}

export function clearMatchesAndProfilesViewed() {
  return axios.put(`${URL}/clear`);
}

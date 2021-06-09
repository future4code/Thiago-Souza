import axios from "axios";

const URL = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/thiago-felipe";

export function listTrips() {
  return axios.get(`${URL}/trips`);
}

export function applyTrip(tripID, candidate) {
  return axios.post(`${URL}/trips/${tripID}/apply`, candidate);
}

export function login(body) {
  return axios.post(`${URL}/login`, body);
}

export function tripDetail(tripID, token) {
  return axios.get(`${URL}/trip/${tripID}`, { headers: { auth: token } });
}

export function createTrip(trip, token) {
  return axios.post(`${URL}/trips`, trip, { headers: { auth: token } });
}

export function deleteTrip(tripID, token) {
  return axios.delete(`${URL}/trips/${tripID}`, { headers: { auth: token } });
}

export function deciceCandidate(tripID, candidateID, approve, token) {
  return axios.put(
    `${URL}/trips/${tripID}/candidates/${candidateID}/decide`,
    { approve },
    { headers: { auth: token } }
  );
}

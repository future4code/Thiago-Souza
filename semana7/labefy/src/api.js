import axios from "axios";

const BASE_URL
= "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

const headers = { Authorization: "thiago-felipe-paiva" };

export function listarPlaylists() {
  return axios.get(BASE_URL, { headers });
}

export function listarMúsicas(id) {
  return axios.get(`${BASE_URL}/${id}/tracks`, { headers });
}

export function criarPlaylist(name) {
  return axios.post(BASE_URL, { name }, { headers });
}

export function adicionarMúsica(playlistID, música) {
  return axios.post(`${BASE_URL}/${playlistID}/tracks`, música, { headers });
}

export function deletarPlaylist(id) {
  return axios.delete(`${BASE_URL}/${id}`, { headers });
}

export function removerMúsica(playlistID, músicaID) {
  return axios.delete(`${BASE_URL}/${playlistID}/tracks/${músicaID}`, { headers });
}

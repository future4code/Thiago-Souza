import axios from "axios";

const BASE_URL
      = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";

const headers = { Authorization: "thiago-felipe-paiva" };

export async function criarUsuario(usuario) {
  return await axios.post(BASE_URL, usuario, { headers });
}

export async function alterarUsuario(id, usuario) {
  return await axios.put(`${BASE_URL}/${id}`, usuario, { headers });
}

export async function listarUsurios() {
  return await axios.get(BASE_URL, { headers });
}

export async function pegarUsuario(id) {
  return await axios.get(`${BASE_URL}/${id}`, { headers });
}

export async function buscarNome(nome) {
  return await axios.get(`${BASE_URL}/search?name=${nome}`, { headers });
}

export async function removerUsuario(id) {
  return await axios.delete(`${BASE_URL}/${id}`, { headers });
}

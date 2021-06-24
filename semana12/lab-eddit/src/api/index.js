import axios from "axios";

const BASE_URL = "https://labeddit.herokuapp.com";

export function setToken(newToken) {
  return localStorage.setItem("token", newToken);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function loginUser(user) {
  return axios.post(`${BASE_URL}/users/login`, user);
}

export function singupUser(user) {
  return axios.post(`${BASE_URL}/users/signup`, user);
}

export function getPosts(token) {
  return axios.get(`${BASE_URL}/posts`, { headers: { Authorization: token } });
}

export function getPostsComments(postID, token) {
  return axios.get(
    `${BASE_URL}/posts/${postID}/comments`,
    { headers: { Authorization: token } }
  );
}

export function createPost(post, token) {
  return axios.post(
    `${BASE_URL}/posts`,
    post,
    { headers: { Authorization: token } }
  );
}

export function createComment(comment, postID, token) {
  return axios.post(
    `${BASE_URL}/posts/${postID}/comments`,
    comment,
    { headers: { Authorization: token } }
  );
}

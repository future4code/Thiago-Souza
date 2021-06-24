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

export function getPosts(token, page = 1) {
  return axios.get(
    `${BASE_URL}/posts?size=60&page=${page}`,
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

export function createPostVote(direction, postID, token) {
  return axios.post(
    `${BASE_URL}/posts/${postID}/votes`,
    { direction },
    { headers: { Authorization: token } }
  );
}

export function changePostVote(direction, postID, token) {
  return axios.put(
    `${BASE_URL}/posts/${postID}/votes`,
    { direction },
    { headers: { Authorization: token } }
  );
}

export function deletePostVote(postID, token) {
  return axios.delete(
    `${BASE_URL}/posts/${postID}/votes`,
    { headers: { Authorization: token } }
  );
}

export function getPostsComments(postID, token) {
  return axios.get(
    `${BASE_URL}/posts/${postID}/comments`,
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

export function createCommentVote(direction, commentID, token) {
  return axios.post(
    `${BASE_URL}/comments/${commentID}/votes`,
    { direction },
    { headers: { Authorization: token } }
  );
}

export function changeCommentVote(direction, commentID, token) {
  return axios.put(
    `${BASE_URL}/comments/${commentID}/votes`,
    { direction },
    { headers: { Authorization: token } }
  );
}

export function deleteCommentVote(commentID, token) {
  return axios.delete(
    `${BASE_URL}/comments/${commentID}/votes`,
    { headers: { Authorization: token } }
  );
}


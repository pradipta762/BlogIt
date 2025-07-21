import axios from "axios";

const fetch = (params = {}) => axios.get("/posts", { params });

const fetchMyPosts = (params = {}) => axios.get("/my-posts", { params });

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const show = slug => axios.get(`/posts/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`/posts/${slug}`, { post: payload });

const destroy = slug => axios.delete(`/posts/${slug}`);

const postsApi = { fetch, create, show, update, destroy, fetchMyPosts };

export default postsApi;

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

const bulkUpdate = ({ slugs, status }) =>
  axios.patch("my-posts/bulk_update", {
    slugs,
    status,
  });

const bulkDestroy = ({ slugs }) =>
  axios.delete("my-posts/bulk_destroy", { data: { slugs } });

const postsApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  fetchMyPosts,
  bulkUpdate,
  bulkDestroy,
};

export default postsApi;

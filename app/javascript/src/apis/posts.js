import { API_ENDPOINTS } from "constants/apiEndPoints";

import axios from "axios";

const fetch = (params = {}) => axios.get(API_ENDPOINTS.POSTS, { params });

const fetchMyPosts = (params = {}) =>
  axios.get(API_ENDPOINTS.MY_POSTS, { params });

const create = payload =>
  axios.post(API_ENDPOINTS.POSTS, {
    post: payload,
  });

const show = slug => axios.get(`${API_ENDPOINTS.POSTS}/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`${API_ENDPOINTS.POSTS}/${slug}`, { post: payload });

const destroy = slug => axios.delete(`${API_ENDPOINTS.POSTS}/${slug}`);

const bulkUpdate = ({ slugs, status }) =>
  axios.patch(`${API_ENDPOINTS.MY_POSTS}/bulk_update`, {
    slugs,
    status,
  });

const bulkDestroy = ({ slugs }) =>
  axios.delete(`${API_ENDPOINTS.MY_POSTS}/bulk_destroy`, { data: { slugs } });

const generatePdf = slug =>
  axios.post(`${API_ENDPOINTS.POSTS}/${slug}/pdf`, {});

const downloadPdf = slug =>
  axios.get(`${API_ENDPOINTS.POSTS}/${slug}/pdf/download`, {
    responseType: "blob",
  });

const postsApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  fetchMyPosts,
  bulkUpdate,
  bulkDestroy,
  generatePdf,
  downloadPdf,
};

export default postsApi;

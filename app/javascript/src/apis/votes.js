import { API_ENDPOINTS } from "constants/apiEndPoints";

import axios from "axios";

const create = (slug, vote_type) =>
  axios.post(`${API_ENDPOINTS.POSTS}/${slug}/vote`, {
    vote: { vote_type },
  });

const votesApi = { create };

export default votesApi;

import axios from "axios";

const create = (slug, vote_type) =>
  axios.post(`posts/${slug}/vote`, {
    vote: { vote_type },
  });

const votesApi = { create };

export default votesApi;

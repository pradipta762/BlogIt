import { API_ENDPOINTS } from "constants/apiEndPoints";

import axios from "axios";

const fetch = () => axios.get(API_ENDPOINTS.ORGANIZATIONS);

const organizationsApi = { fetch };

export default organizationsApi;

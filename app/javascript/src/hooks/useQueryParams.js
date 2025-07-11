import { keysToCamelCase } from "@bigbinary/neeto-cist";
import { parse } from "qs";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const useQueryParams = () => {
  const location = useLocation();
  const queryParams = parse(location.search, { ignoreQueryPrefix: true });

  return keysToCamelCase(queryParams);
};

export default useQueryParams;

import { QUERY_KEYS } from "constants/query";

import organizationsApi from "apis/organizations";
import { useQuery } from "react-query";

export const useFetchOrganizations = () =>
  useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATION],
    queryFn: () => organizationsApi.fetch(),
    select: ({ data }) => data.organizations,
  });

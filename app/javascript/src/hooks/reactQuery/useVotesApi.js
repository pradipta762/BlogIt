import { QUERY_KEYS } from "constants/query";

import votesApi from "apis/votes";
import { useMutation, useQueryClient } from "react-query";

export const useVote = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, vote_type }) => votesApi.create(slug, vote_type),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POST]);
      onSuccess?.(...args);
    },
  });
};

import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useFetchPosts = (page, params = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, page, params],
    queryFn: async () => {
      const { data } = await postsApi.fetch({ page, ...params });

      return data;
    },
    keepPreviousData: true,
  });

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: async () => {
      const {
        data: { post },
      } = await postsApi.show(slug);

      return post;
    },
  });

export const useCreatePost = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => postsApi.create(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POST]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};

export const useUpdatePost = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, payload }) => postsApi.update({ slug, payload }),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POST]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};

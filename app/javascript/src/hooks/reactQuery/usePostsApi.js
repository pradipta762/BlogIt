import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery } from "react-query";

export const useFetchPosts = page =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, page],
    queryFn: async () => {
      const { data } = await postsApi.fetch({ page });

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

export const useCreatePost = () =>
  useMutation({
    mutationFn: payload => postsApi.create(payload),
  });

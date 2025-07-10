import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery } from "react-query";

export const useFetchPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.POST],
    queryFn: async () => {
      const {
        data: { posts },
      } = await postsApi.fetch();

      return posts;
    },
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

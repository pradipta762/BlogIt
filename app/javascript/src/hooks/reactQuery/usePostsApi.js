import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useFetchPosts = (page, params = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, page, params],
    queryFn: () => postsApi.fetch({ page, ...params }),
    select: ({ data }) => data,
    keepPreviousData: true,
  });

export const useFetchMyPosts = (page, params = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.MYPOSTS, page, params],
    queryFn: () => postsApi.fetchMyPosts({ page, ...params }),
    select: ({ data }) => data,
    keepPreviousData: true,
  });

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: () => postsApi.show(slug),
    select: ({ data }) => data.post,
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
      queryClient.invalidateQueries([QUERY_KEYS.MYPOSTS]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};

export const useBulkUpdatePosts = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slugs, status }) => postsApi.bulkUpdate({ slugs, status }),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.MYPOSTS]);
      onSuccess?.(...args);
    },
  });
};

export const useBulkDeletePosts = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slugs }) => postsApi.bulkDestroy({ slugs }),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.MYPOSTS]);
      onSuccess?.(...args);
    },
  });
};

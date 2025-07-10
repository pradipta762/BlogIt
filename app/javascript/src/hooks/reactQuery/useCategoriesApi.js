import { QUERY_KEYS } from "constants/query";

import categoriesApi from "apis/categories";
import { useMutation, useQuery } from "react-query";

export const useFetchPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORY],
    queryFn: async () => {
      const {
        data: { categories },
      } = await categoriesApi.fetch();

      return categories;
    },
  });

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORY, slug],
    queryFn: async () => {
      const {
        data: { category },
      } = await categoriesApi.show(slug);

      return category;
    },
  });

export const useCreatePost = () =>
  useMutation({
    mutationFn: payload => categoriesApi.create(payload),
  });

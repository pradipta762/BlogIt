import { QUERY_KEYS } from "constants/query";

import categoriesApi from "apis/categories";
import { useMutation, useQuery } from "react-query";

export const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORY],
    queryFn: async () => {
      const {
        data: { categories },
      } = await categoriesApi.fetch();

      return categories;
    },
  });

export const useCreateCategory = () =>
  useMutation({
    mutationFn: payload => categoriesApi.create(payload),
  });

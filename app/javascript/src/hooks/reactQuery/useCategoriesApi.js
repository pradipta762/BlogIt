import { QUERY_KEYS } from "constants/query";

import categoriesApi from "apis/categories";
import { useMutation, useQuery } from "react-query";

export const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORY],
    queryFn: () => categoriesApi.fetch(),
    select: ({ data }) => data.categories,
  });

export const useCreateCategory = () =>
  useMutation({
    mutationFn: payload => categoriesApi.create(payload),
  });

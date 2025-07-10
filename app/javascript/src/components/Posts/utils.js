import dayjs from "dayjs";

export const makeCategoryOptions = categories =>
  categories?.map(category => ({
    label: category.name,
    value: category.id,
  })) || [];

export const formatDate = date => dayjs(date).format("DD MMMM YYYY");

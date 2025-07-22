export const DROPDOWN_MENU = [
  { key: "title", value: "Title" },
  { key: "categories", value: "Category" },
  { key: "last_published_at", value: "Last published at" },
  { key: "status", value: "Status" },
];

export const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
];

export const COLUMN_DATA = [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: 400,
  },
  {
    title: "CATEGORY",
    dataIndex: "categories",
    key: "categories",
    width: 300,
  },
  {
    title: "LAST PUBLISHED AT",
    dataIndex: "last_published_at",
    key: "last_published_at",
    width: 250,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    width: 150,
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: 100,
  },
];

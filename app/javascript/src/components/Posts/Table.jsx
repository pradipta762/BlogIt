import React from "react";

import dayjs from "dayjs";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Table, Tooltip } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { POST_STATUS } from "./constants";

const PostTable = ({ posts, deletePost, updatePostStatus }) => {
  const { t } = useTranslation();
  const columnData = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      width: 450,
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
      width: 200,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: 100,
    },
  ];

  const rowData = posts.map(post => ({
    id: post.slug,
    title: (
      <Tooltip content={post.title} position="top">
        <Link
          className="truncate font-semibold text-indigo-700"
          to={`/posts/${post.slug}/edit`}
        >
          {post.title}
        </Link>
      </Tooltip>
    ),
    categories: post.categories.map(category => category.name).join(", "),
    last_published_at: dayjs(post.updated_at).format("MMM D, YYYY, HH:mm A"),
    status: post.status.charAt(0).toUpperCase().concat(post.status.slice(1)),
    action: (
      <Dropdown buttonStyle="text" className="z-[999]" icon={MenuHorizontal}>
        <Dropdown.Menu>
          {post.status === "draft" ? (
            <Dropdown.MenuItem.Button
              onClick={() => updatePostStatus(post.slug, POST_STATUS.PUBLISHED)}
            >
              {t("labels.publish")}
            </Dropdown.MenuItem.Button>
          ) : (
            <Dropdown.MenuItem.Button
              onClick={() => updatePostStatus(post.slug, POST_STATUS.DRAFT)}
            >
              {t("labels.unpublish")}
            </Dropdown.MenuItem.Button>
          )}
          <Dropdown.Divider />
          <Dropdown.MenuItem.Button
            style="danger"
            onClick={() => deletePost(post.slug)}
          >
            {t("labels.delete")}
          </Dropdown.MenuItem.Button>
        </Dropdown.Menu>
      </Dropdown>
    ),
  }));

  return <Table columnData={columnData} rowData={rowData} />;
};

export default PostTable;

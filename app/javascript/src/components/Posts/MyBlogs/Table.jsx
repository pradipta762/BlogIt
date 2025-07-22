import React from "react";

import dayjs from "dayjs";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Table, Tooltip } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { COLUMN_DATA } from "./constant";

import { POST_STATUS } from "../constants";

const PostTable = ({ posts, deletePost, updatePostStatus, visibleColumns }) => {
  const { t } = useTranslation();

  const filteredColumns = COLUMN_DATA.filter(
    column =>
      column.key === "title" ||
      column.key === "action" ||
      visibleColumns[column.key]
  );

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

  return <Table columnData={filteredColumns} rowData={rowData} />;
};

export default PostTable;

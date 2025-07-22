import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container, PageLoader, EmptyBlogs } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useFetchMyPosts, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import Logger from "js-logger";
import { Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import { buildUrl } from "utils/url";

import Header from "./Header";
import PostTable from "./Table";

import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../../Dashboard/constants";
import { makeCategoryOptions } from "../utils";

const MyPost = () => {
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    categories: true,
    last_published_at: true,
    status: true,
    actions: true,
  });

  const [filters, setFilters] = useState({
    title: "",
    status: {},
    category_ids: [],
  });

  const history = useHistory();

  const { page } = useQueryParams();

  const currentPage = Number(page) || DEFAULT_PAGE_NUMBER;

  const { data, isLoading } = useFetchMyPosts(currentPage, {
    ...filters,
  });

  const { data: categories } = useFetchCategories();

  const categoryOptions = makeCategoryOptions(categories);

  const posts = data?.posts || [];
  const meta = data?.meta || {};

  const totalPosts = meta.total_count;

  const { mutate: updatePost } = useUpdatePost({
    onSuccess: () => {},
    onError: error => {
      Logger.error(error);
    },
  });

  const handlePageNavigation = newPage => {
    if (newPage === 1) history.replace(routes.dashboard);
    history.replace(buildUrl(routes.dashboard, { page: newPage }));
  };

  const deletePost = async slug => {
    try {
      await postsApi.destroy(slug);
      history.push(routes.dashboard);
    } catch (error) {
      Logger.error(error);
    }
  };

  const updatePostStatus = (slug, status) => {
    updatePost({
      slug,
      payload: {
        status,
      },
    });
  };

  if (isEmpty(posts)) {
    return <EmptyBlogs />;
  }

  return (
    <Container className="flex min-h-screen w-full flex-col justify-between space-y-4">
      <div className="flex w-full flex-col space-y-4">
        <div className="flex w-full flex-col justify-between gap-2">
          <Header
            {...{
              totalPosts,
              visibleColumns,
              setVisibleColumns,
              filters,
              setFilters,
              categoryOptions,
            }}
          />
        </div>
        {isLoading ? (
          <PageLoader />
        ) : (
          <PostTable
            {...{ posts, deletePost, updatePostStatus, visibleColumns }}
          />
        )}
      </div>
      {meta.total_pages > 1 && (
        <div className="flex justify-end">
          <Pagination
            count={meta.total_count}
            navigate={handlePageNavigation}
            pageNo={meta.current_page || currentPage}
            pageSize={DEFAULT_PAGE_SIZE}
          />
        </div>
      )}
    </Container>
  );
};

export default MyPost;

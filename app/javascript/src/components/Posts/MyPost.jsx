import React from "react";

import { Button, Pagination, Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { useFetchPosts, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import Logger from "js-logger";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { buildUrl } from "utils/url";

import PostTable from "./Table";

import routes from "../../routes";
import { Container, PageLoader, PageHeader } from "../commons";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../Dashboard/constants";

const MyPost = () => {
  const history = useHistory();

  const { page } = useQueryParams();

  const currentPage = Number(page) || DEFAULT_PAGE_NUMBER;

  const { data, isLoading } = useFetchPosts(currentPage, { my_posts: true });

  const posts = data?.posts || [];
  const meta = data?.meta || {};

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
    return (
      <Container className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Typography className="text-center text-xl font-medium text-gray-600">
          You have not posted any blogs. If you want to post one, then click
          below.
        </Typography>
        <Button
          className="bg-indigo-700 hover:bg-indigo-800"
          label="Add a new post"
          to={routes.posts.create}
        />
      </Container>
    );
  }

  return (
    <Container className="flex min-h-screen w-full flex-col justify-between space-y-4">
      <div className="flex w-full flex-col space-y-4">
        <div className="flex w-full flex-col justify-between gap-2">
          <PageHeader style="h1" title="My blog posts" />
          <Typography>{meta.total_count} articles</Typography>
        </div>
        {isLoading ? (
          <PageLoader />
        ) : (
          <PostTable {...{ posts, deletePost, updatePostStatus }} />
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

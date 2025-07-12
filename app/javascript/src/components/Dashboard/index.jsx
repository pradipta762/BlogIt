import React from "react";

import { Button, Pagination, Typography } from "@bigbinary/neetoui";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { isEmpty, includes } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useCategoryStore from "stores/useCategoryStore";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "./constants";

import routes from "../../routes";
import { Container, PageLoader, PageHeader } from "../commons";
import Lists from "../Posts/Lists";

const Dashboard = () => {
  const history = useHistory();

  const { page } = useQueryParams();

  const currentPage = Number(page) || DEFAULT_PAGE_NUMBER;

  const { data, isLoading } = useFetchPosts(currentPage);

  const posts = data?.posts || [];
  const meta = data?.meta || {};

  const { selectedCategory } = useCategoryStore();

  const selectedCategoryIds = selectedCategory.map(c => c.id);

  const filteredPosts = isEmpty(selectedCategory)
    ? posts
    : posts.filter(({ categories }) =>
        categories.some(category => includes(category.id, selectedCategoryIds))
      );

  const handlePageNavigation = newPage => {
    if (newPage === 1) history.replace(routes.dashboard);
    history.replace(buildUrl(routes.dashboard, { page: newPage }));
  };

  if (isEmpty(posts)) {
    return (
      <Container className="flex min-h-screen items-center justify-center">
        <Typography className="text-center text-xl font-medium text-gray-600">
          You have not posted any blogs.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="flex min-h-screen w-full flex-col justify-between space-y-4">
      <div className="flex w-full flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <PageHeader style="h1" title="Blog posts">
            <Button
              className="bg-indigo-600 hover:bg-indigo-800"
              label="Add a new post"
              to={routes.posts.create}
            />
          </PageHeader>
        </div>
        {isLoading ? (
          <PageLoader />
        ) : (
          <Lists {...{ filteredPosts }} className="w-full flex-1" />
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

export default Dashboard;

import React from "react";

import {
  Container,
  PageLoader,
  PageHeader,
  EmptyBlogs,
} from "components/commons";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { Button, Pagination } from "neetoui";
import { isEmpty, includes } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import useCategoryStore from "stores/useCategoryStore";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "./constants";

import Lists from "../Posts/Lists";

const Dashboard = () => {
  const history = useHistory();

  const { page } = useQueryParams();

  const { t } = useTranslation();

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
    return <EmptyBlogs />;
  }

  return (
    <Container className="flex min-h-screen w-full flex-col justify-between space-y-4">
      <div className="flex w-full flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <PageHeader style="h1" title={t("titles.blogPost")}>
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              label={t("labels.newPost")}
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

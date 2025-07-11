import React from "react";

import { Button } from "@bigbinary/neetoui";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { isNil, isEmpty, either, includes } from "ramda";
import useCategoryStore from "stores/useCategoryStore";

import { Container, PageLoader, PageTitle } from "../commons";
import Lists from "../Posts/Lists";

const Dashboard = () => {
  const { data: posts, isLoading } = useFetchPosts();

  const { selectedCategory } = useCategoryStore();

  const selectedCategoryIds = selectedCategory.map(category => category.id);

  const filteredPosts = !isEmpty(selectedCategory)
    ? posts.filter(({ categories }) =>
        categories.some(category => includes(category.id, selectedCategoryIds))
      )
    : posts;

  if (isLoading) {
    return <PageLoader />;
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container className="flex min-h-screen w-full items-center justify-center">
        <h1 className="my-5 text-center text-xl leading-5">
          You have not posted any blogs.
        </h1>
      </Container>
    );
  }

  return (
    <Container className="flex w-full flex-col space-y-4">
      <div className="flex w-full items-end justify-between">
        <PageTitle title="Blog posts" />
        <Button
          className="bg-indigo-600 hover:bg-indigo-800"
          label="Add a new post"
          to="posts/create"
        />
      </div>
      <Lists {...{ filteredPosts }} className="w-full flex-1" />
    </Container>
  );
};

export default Dashboard;

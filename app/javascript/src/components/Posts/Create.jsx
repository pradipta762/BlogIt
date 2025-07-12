import React, { useState } from "react";

import { Container, PageHeader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";

import Form from "./Form";
import { makeCategoryOptions } from "./utils";

import routes from "../../routes";

const CreatePost = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { mutate: createPost, isLoading } = useCreatePost({
    onSuccess: () => {
      history.replace(routes.dashboard);
    },
    onError: error => {
      Logger.error(error);
    },
  });
  const { data: categories } = useFetchCategories();

  const categoryOptions = makeCategoryOptions(categories);

  const handleCategoryChange = selectedOptions => {
    const categories = selectedOptions.map(option => ({
      id: option.value,
      name: option.label,
    }));
    setSelectedCategories(categories);
  };

  const handleSubmit = event => {
    event.preventDefault();

    createPost({
      title,
      description,
      category_ids: selectedCategories.map(cat => cat.id),
    });
  };

  return (
    <Container className="w-full">
      <div className="flex flex-col gap-y-8">
        <PageHeader title="New blog post" />
        <Form
          {...{
            categoryOptions,
            title,
            setTitle,
            description,
            setDescription,
            isLoading,
            handleSubmit,
            handleCategoryChange,
          }}
          label="Submit"
        />
      </div>
    </Container>
  );
};

export default CreatePost;

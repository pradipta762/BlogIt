import React, { useState } from "react";

import { Container, PageTitle } from "components/commons";
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

  const { mutate: createPost, isLoading } = useCreatePost();
  const { data: categories } = useFetchCategories();

  const categoryOptions = makeCategoryOptions(categories);

  const handleSubmit = event => {
    event.preventDefault();

    createPost(
      {
        title,
        description,
        user_id: 1,
        organization_id: 1,
        category_ids: selectedCategories,
      },
      {
        onSuccess: () => {
          history.push(routes.dashboard);
        },
        onError: error => {
          Logger.error(error);
        },
      }
    );
  };

  return (
    <Container className="w-full">
      <div className="flex flex-col gap-y-8">
        <PageTitle title="New blog post" />
        <Form
          {...{
            categoryOptions,
            title,
            setTitle,
            description,
            setDescription,
            setSelectedCategories,
            isLoading,
            handleSubmit,
          }}
        />
      </div>
    </Container>
  );
};

export default CreatePost;

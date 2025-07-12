import React, { useEffect, useState } from "react";

import { Container, PageHeader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useUpdatePost, useShowPost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Form from "./Form";
import { makeCategoryOptions } from "./utils";

import routes from "../../routes";

const EditPost = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { slug } = useParams();

  const { data: post, isLoading: isPostDetailsLoading } = useShowPost(slug);

  const { mutate: updatePost, isLoading: isPostUpdating } = useUpdatePost({
    onSuccess: () => {
      history.push(routes.dashboard);
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const { data: categories } = useFetchCategories();

  const categoryOptions = makeCategoryOptions(categories);

  const handleCategoryChange = selectedOptions =>
    setSelectedCategories(
      selectedOptions.map(option => ({
        id: option.value,
        name: option.label,
      }))
    );

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSelectedCategories(post.categories);
      setDescription(post.description);
    }
  }, [post]);

  const handleSubmit = event => {
    event.preventDefault();

    updatePost({
      slug,
      payload: {
        title,
        description,
        category_ids: selectedCategories.map(category => category.id),
      },
    });
  };

  return (
    <Container className="w-full">
      <div className="flex flex-col gap-y-8">
        <PageHeader title="Edit blog post" />
        <Form
          {...{
            categoryOptions,
            title,
            setTitle,
            description,
            setDescription,
            selectedCategories,
            handleSubmit,
            handleCategoryChange,
          }}
          isLoading={isPostDetailsLoading || isPostUpdating}
          label="Update"
        />
      </div>
    </Container>
  );
};

export default EditPost;

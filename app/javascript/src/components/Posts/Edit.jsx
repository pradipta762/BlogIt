import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { Container, PageHeader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useUpdatePost, useShowPost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { ExternalLink, MenuHorizontal } from "neetoicons";
import { Button, Dropdown } from "neetoui";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import ActionDropdownMenu from "./ActionDropdownMenu";
import { POST_STATUS } from "./constants";
import Form from "./Form";
import { makeCategoryOptions } from "./utils";

const EditPost = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [status, setStatus] = useState(POST_STATUS.PUBLISHED);

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
        status,
      },
    });
  };

  const destroyPost = async () => {
    try {
      await postsApi.destroy(slug);
      history.push(routes.dashboard);
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleCancel = () => {
    history.push(routes.dashboard);
  };

  return (
    <Container className="w-full">
      <div className="flex flex-col gap-y-8">
        <PageHeader style="h1" title="Edit blog post">
          <div className="flex items-center space-x-4">
            <Button
              icon={ExternalLink}
              style="text"
              to={`/posts/${slug}/show`}
            />
            <Button label="Cancel" style="secondary" onClick={handleCancel} />
            <ActionDropdownMenu {...{ status, setStatus, handleSubmit }} />
            <Dropdown buttonStyle="text" icon={MenuHorizontal}>
              <Dropdown.Menu>
                <Dropdown.MenuItem.Button style="danger" onClick={destroyPost}>
                  Delete
                </Dropdown.MenuItem.Button>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </PageHeader>
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
        />
      </div>
    </Container>
  );
};

export default EditPost;

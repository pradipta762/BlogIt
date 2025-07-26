import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { Container, PageHeader } from "components/commons";
import dayjs from "dayjs";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useUpdatePost, useShowPost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { ExternalLink, MenuHorizontal } from "neetoicons";
import { Button, Dropdown, Alert } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import usePostPreviewStore from "stores/postPreviewStore";

import ActionDropdownMenu from "./ActionDropdownMenu";
import { POST_STATUS } from "./constants";
import Form from "./Form";
import { makeCategoryOptions } from "./utils";

const EditPost = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [status, setStatus] = useState(POST_STATUS.PUBLISHED);
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  const { t } = useTranslation();

  const { slug } = useParams();

  const { data: post, isLoading: isPostDetailsLoading } = useShowPost(slug);

  const { previewPost, setPreviewPost } = usePostPreviewStore();

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
    if (previewPost && previewPost.title) {
      setTitle(previewPost.title);
      setSelectedCategories(previewPost.categories || []);
      setDescription(previewPost.description || "");
    } else if (post && post.title) {
      setTitle(post.title);
      setSelectedCategories(post.categories || []);
      setDescription(post.description || "");
    }
  }, [post, previewPost]);

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

  const updatedAt = dayjs().format("MMM D, YYYY");

  const handlePreview = () => {
    setPreviewPost({
      title,
      description,
      categories: selectedCategories,
      status,
      user: post?.user,
      updated_at: updatedAt,
    });
    history.push(routes.posts.preview.replace(":slug", `${slug}`));
  };

  return (
    <>
      <Container className="w-full">
        <div className="flex flex-col gap-y-8">
          <PageHeader style="h1" title={t("titles.post.edit")}>
            <div className="flex items-center space-x-4">
              <Button
                icon={ExternalLink}
                style="text"
                onClick={handlePreview}
              />
              <Button
                label={t("labels.cancel")}
                style="secondary"
                onClick={handleCancel}
              />
              <ActionDropdownMenu {...{ status, setStatus, handleSubmit }} />
              <Dropdown buttonStyle="text" icon={MenuHorizontal}>
                <Dropdown.Menu>
                  <Dropdown.MenuItem.Button
                    style="danger"
                    onClick={() => setShouldShowDeleteAlert(true)}
                  >
                    {t("labels.delete")}
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
      <Alert
        isOpen={shouldShowDeleteAlert}
        message={t("messages.deletePost")}
        title={t("titles.post.delete")}
        onClose={() => setShouldShowDeleteAlert(false)}
        onSubmit={destroyPost}
      />
    </>
  );
};

export default EditPost;

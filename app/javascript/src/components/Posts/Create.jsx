import React, { useState } from "react";

import { Container, PageHeader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

import ActionDropdownMenu from "./ActionDropdownMenu";
import { POST_STATUS } from "./constants";
import Form from "./Form";
import { makeCategoryOptions } from "./utils";

const CreatePost = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [status, setStatus] = useState(POST_STATUS.PUBLISHED);

  const { t } = useTranslation();

  const { mutate: createPost } = useCreatePost({
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
      status,
    });
  };

  const handleCancel = () => {
    history.push(routes.dashboard);
  };

  return (
    <Container className="w-full">
      <div className="flex flex-col gap-y-8">
        <PageHeader style="h1" title={t("titles.post.create")}>
          <div className="space-x-4">
            <Button
              label={t("labels.cancel")}
              style="secondary"
              onClick={handleCancel}
            />
            <ActionDropdownMenu {...{ status, setStatus, handleSubmit }} />
          </div>
        </PageHeader>
        <Form
          {...{
            categoryOptions,
            title,
            setTitle,
            description,
            setDescription,
            handleSubmit,
            handleCategoryChange,
          }}
        />
      </div>
    </Container>
  );
};

export default CreatePost;

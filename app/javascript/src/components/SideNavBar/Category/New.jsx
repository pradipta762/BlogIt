import React, { useState } from "react";

import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";
import { Button, Input, Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const New = ({ setIsModalOpen }) => {
  const [category, setCategory] = useState("");
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { mutate: createCategory, isLoading } = useCreateCategory();

  const handleAddCategory = () => {
    if (!category.trim()) return;

    createCategory(
      { name: category },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          setCategory("");
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      <Modal.Header>
        <Typography className="font-semibold" style="h2">
          {t("titles.newCategory")}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Input
          label={t("labels.categoryTitle")}
          placeholder="Ruby"
          onChange={({ target: { value } }) => setCategory(value)}
        />
        <div className="mt-4 space-x-3">
          <Button
            className="bg-indigo-700"
            label={t("labels.add")}
            loading={isLoading}
            style="primary"
            onClick={handleAddCategory}
          />
          <Button
            label={t("labels.cancel")}
            style="secondary"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </Modal.Body>
    </>
  );
};

export default New;

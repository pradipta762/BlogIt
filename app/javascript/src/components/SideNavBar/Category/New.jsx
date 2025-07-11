import React, { useState } from "react";

import { Button, Input, Modal, Typography } from "@bigbinary/neetoui";
import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";
import { useQueryClient } from "react-query";

const New = ({ setIsModalOpen }) => {
  const [category, setCategory] = useState("");
  const queryClient = useQueryClient();
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
          New category
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Input
          label="Category title"
          placeholder="Ruby"
          onChange={({ target: { value } }) => setCategory(value)}
        />
        <div className="mt-4 space-x-3">
          <Button
            className="bg-indigo-700"
            label="Add"
            loading={isLoading}
            style="primary"
            onClick={handleAddCategory}
          />
          <Button
            label="Cancel"
            style="secondary"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </Modal.Body>
    </>
  );
};

export default New;

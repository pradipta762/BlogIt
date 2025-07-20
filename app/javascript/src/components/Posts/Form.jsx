import React from "react";

import { Input, Select, Textarea } from "neetoui";

import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "./constants";
import { makeCategoryOptions } from "./utils";

const Form = ({
  categoryOptions,
  title,
  setTitle,
  description,
  setDescription,
  selectedCategories,
  handleSubmit,
  handleCategoryChange,
}) => {
  const defaultCategoryOptions =
    selectedCategories?.length > 0
      ? makeCategoryOptions(selectedCategories)
      : undefined;

  return (
    <form
      className="flex w-full flex-col justify-between rounded-xl border px-10 py-8 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Input
          required
          label="Title"
          maxLength={MAX_TITLE_LENGTH}
          placeholder="Blog Title (Max 125 characters allowed)"
          value={title}
          onBlur={({ target: { value } }) => setTitle(value.trim())}
          onChange={({ target: { value } }) =>
            setTitle(value.slice(0, MAX_TITLE_LENGTH))
          }
        />
        <Select
          isMulti
          isSearchable
          required
          label="Category"
          options={categoryOptions}
          placeholder="Search category"
          value={defaultCategoryOptions}
          onChange={selectedOptions => handleCategoryChange(selectedOptions)}
        />
        <Textarea
          required
          label="Description"
          maxLength={MAX_DESCRIPTION_LENGTH}
          placeholder="Description (Max 10000 characters allowed)"
          rows="10"
          value={description}
          onBlur={({ target: { value } }) => setDescription(value.trim())}
          onChange={({ target: { value } }) =>
            setDescription(value.slice(0, MAX_DESCRIPTION_LENGTH))
          }
        />
      </div>
    </form>
  );
};

export default Form;

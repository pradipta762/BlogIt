import React from "react";

import { Input, Select, Textarea } from "neetoui";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
          label={t("labels.title")}
          maxLength={MAX_TITLE_LENGTH}
          placeholder={t("placeholders.title")}
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
          label={t("labels.category")}
          options={categoryOptions}
          placeholder={t("placeholders.category")}
          value={defaultCategoryOptions}
          onChange={selectedOptions => handleCategoryChange(selectedOptions)}
        />
        <Textarea
          required
          label={t("labels.description")}
          maxLength={MAX_DESCRIPTION_LENGTH}
          placeholder={t("placeholders.description")}
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

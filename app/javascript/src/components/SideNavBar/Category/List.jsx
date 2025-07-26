import React from "react";

import classNames from "classnames";
import { PageLoader } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useCategoryStore from "stores/useCategoryStore";

const List = ({ searchTerm }) => {
  const { data: categories = [], isLoading } = useFetchCategories();

  const { toggleSelect, isSelectedCategory } = useCategoryStore();

  const { t } = useTranslation();

  const handleCategorySelect = category => {
    toggleSelect(category);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isEmpty(categories) || isEmpty(filteredCategories)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NoData title={t("errors.noCategoryFound")} />
      </div>
    );
  }

  if (isLoading) return <PageLoader />;

  return (
    <ul className="mt-4 flex flex-col space-y-2">
      {filteredCategories.map(category => (
        <li
          key={category.id}
          className={classNames(
            "cursor-pointer border px-3 py-1 transition-colors",
            {
              "border-indigo-200 bg-white font-semibold text-indigo-500":
                isSelectedCategory(category),
              "bg-gray-100 hover:bg-white": !isSelectedCategory(category),
            }
          )}
          onClick={() => handleCategorySelect(category)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default List;

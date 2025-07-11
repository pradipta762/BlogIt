import React from "react";

import classNames from "classnames";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import useCategoryStore from "stores/useCategoryStore";

const List = ({ searchTerm }) => {
  const { data: categories = [] } = useFetchCategories();

  const { toggleSelect, isSelectedCategory } = useCategoryStore();

  const handleCategorySelect = category => {
    toggleSelect(category);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

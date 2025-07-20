import React from "react";

import { Tag } from "neetoui";
import { isEmpty } from "ramda";

const List = ({ categories }) => {
  if (isEmpty(categories)) return null;

  return (
    <div className="flex gap-2">
      {categories.map(({ id, name }) => (
        <Tag key={id} label={name} />
      ))}
    </div>
  );
};

export default List;

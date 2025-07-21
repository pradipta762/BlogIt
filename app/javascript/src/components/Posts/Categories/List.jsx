import React from "react";

import { Tag, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

const List = ({ categories }) => {
  const { t } = useTranslation();

  if (isEmpty(categories)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Typography>{t("labels.emptyCategory")}</Typography>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {categories.map(({ id, name }) => (
        <Tag key={id} label={name} />
      ))}
    </div>
  );
};

export default List;

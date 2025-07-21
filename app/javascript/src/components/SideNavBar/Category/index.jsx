import React, { useState } from "react";

import useDebounce from "hooks/useDebounce";
import { Plus, Search } from "neetoicons";
import { Button, Input, Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import List from "./List";
import New from "./New";

const CategoryPane = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchField, setShowSearchField] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const debouncedSearchTerm = useDebounce(searchTerm);

  return (
    <>
      <aside className="sticky left-full top-0 z-10 h-screen w-72 border-r border-gray-200 bg-gray-100 shadow-sm">
        <div className="flex h-full flex-col space-y-5 px-4 pb-8 pt-12">
          <div className="flex items-center justify-between">
            <Typography className="font-semibold uppercase" style="h3">
              {t("titles.category")}
            </Typography>
            <div className="space-x-2">
              <Button
                icon={Search}
                style="text"
                onClick={() => setShowSearchField(prev => !prev)}
              />
              <Button
                icon={Plus}
                style="text"
                onClick={() => setIsModalOpen(prev => !prev)}
              />
            </div>
          </div>
          {showSearchField && (
            <Input
              className="flex-grow-0 bg-transparent"
              placeholder={t("placeholders.category")}
              size="medium"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          )}
          <List
            searchTerm={debouncedSearchTerm}
            {...{ selected, setSelected }}
          />
        </div>
      </aside>
      <Modal
        isOpen={isModalOpen}
        size="medium"
        onClose={() => setIsModalOpen(false)}
      >
        <New {...{ setIsModalOpen }} />
      </Modal>
    </>
  );
};

export default CategoryPane;

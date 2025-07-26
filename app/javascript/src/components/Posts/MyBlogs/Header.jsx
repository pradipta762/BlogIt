import React, { useState } from "react";

import { PageHeader } from "components/commons";
import { t } from "i18next";
import { Filter, Delete } from "neetoicons";
import {
  ActionDropdown,
  Typography,
  Button,
  Pane,
  Checkbox,
  Input,
  Select,
  Dropdown,
  Alert,
  Tag,
} from "neetoui";
import { length } from "ramda";
import { Trans } from "react-i18next";

import { DROPDOWN_MENU, statusOptions } from "./constant";

import { POST_STATUS } from "../constants";

const Header = ({
  totalPosts,
  visibleColumns,
  setVisibleColumns,
  filters,
  setFilters,
  categoryOptions,
  selectedRowKeys,
  handleBulkDelete,
  handleBulkUpdate,
}) => {
  const [shouldShowFilterPane, setShouldShowFilterPane] = useState(false);
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  const handleShowFilterPane = () => setShouldShowFilterPane(prev => !prev);

  const handleToggleColumn = key => {
    if (key === "title") return;
    setVisibleColumns(previousState => ({
      ...previousState,
      [key]: !previousState[key],
    }));
  };

  const categoryValues = () =>
    categoryOptions.filter(category =>
      filters.category_ids.includes(category.value)
    );

  const handleCategoryChange = selectedOptions => {
    const categoryIds = selectedOptions.map(option => option.value);
    setFilters({ ...filters, category_ids: categoryIds });
  };

  const handleClearFilter = () => {
    setFilters({
      title: "",
      status: { value: "", label: "" },
      category_ids: [],
    });
  };

  const numberOfSelectedRows = length(selectedRowKeys);
  const makeSentenceCase = word =>
    word.charAt(0).toUpperCase().concat(word.slice(1));

  return (
    <>
      <PageHeader style="h1" title={t("titles.myBlogPosts")} />
      {numberOfSelectedRows > 0 && (
        <div className="flex items-center space-x-4">
          <Typography>
            <Trans
              components={{ strong: <strong /> }}
              i18nKey="totalSelectedArticles"
              values={{ numberOfSelectedRows, totalPosts }}
            />
          </Typography>
          <div className="flex items-center space-x-4">
            <Dropdown buttonStyle="secondary" label={t("labels.changeStatus")}>
              <Dropdown.Menu>
                <Dropdown.MenuItem.Button
                  onClick={() => handleBulkUpdate(POST_STATUS.DRAFT)}
                >
                  {t("labels.draft")}
                </Dropdown.MenuItem.Button>
                <Dropdown.MenuItem.Button
                  onClick={() => handleBulkUpdate(POST_STATUS.PUBLISHED)}
                >
                  {t("labels.publish")}
                </Dropdown.MenuItem.Button>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              className="bg-red-50"
              icon={Delete}
              iconPosition="right"
              label={t("labels.delete")}
              style="danger-text"
              onClick={() => setShouldShowDeleteAlert(true)}
            />
          </div>
        </div>
      )}
      {!numberOfSelectedRows && (
        <div className="flex items-center justify-between">
          {filters.title ||
          filters.status?.value ||
          filters.category_ids.length > 0 ? (
            <div className="flex items-center space-x-4">
              <Typography>
                <Trans
                  components={{ strong: <strong /> }}
                  i18nKey="titles.results"
                  values={{
                    totalPosts,
                    title: makeSentenceCase(filters.title),
                  }}
                />
              </Typography>
              <div className="mt-2 flex flex-wrap gap-2">
                {categoryValues().map(category => (
                  <Tag key={category.value} label={category.label} />
                ))}
                {filters.status.value === POST_STATUS.DRAFT ? (
                  <Tag label={t("labels.draft")} style="danger" />
                ) : (
                  <Tag label={t("labels.published")} />
                )}
              </div>
            </div>
          ) : (
            <Typography>
              <Trans i18nKey="totalArticles" values={{ totalPosts }} />
            </Typography>
          )}
          <div className="flex items-center space-x-3">
            <ActionDropdown buttonStyle="secondary" label="Columns">
              <ActionDropdown.Menu>
                {DROPDOWN_MENU.map(menuItem => (
                  <ActionDropdown.MenuItem.Button
                    disabled={menuItem.key === "title"}
                    key={menuItem.key}
                    onClick={event => {
                      event.preventDefault();
                    }}
                  >
                    <Checkbox
                      checked={visibleColumns[menuItem.key]}
                      disabled={menuItem.key === "title"}
                      label={menuItem.value}
                      onChange={() => handleToggleColumn(menuItem.key)}
                    />
                  </ActionDropdown.MenuItem.Button>
                ))}
              </ActionDropdown.Menu>
            </ActionDropdown>
            <Button icon={Filter} style="text" onClick={handleShowFilterPane} />
          </div>
        </div>
      )}
      <Pane
        isOpen={shouldShowFilterPane}
        size="small"
        onClose={handleShowFilterPane}
      >
        <Pane.Header>
          <Typography style="h2" weight="semibold">
            {t("titles.filters")}
          </Typography>
        </Pane.Header>
        <Pane.Body>
          <div className="flex w-full flex-col space-y-5">
            <Input
              className="w-full"
              label={t("labels.title")}
              value={filters.title}
              onChange={e => setFilters({ ...filters, title: e.target.value })}
            />
            <Select
              isMulti
              className="w-full"
              label={t("labels.category")}
              options={categoryOptions}
              value={categoryValues()}
              onChange={selectedOption => handleCategoryChange(selectedOption)}
            />
            <Select
              isClearable
              className="w-full"
              label={t("labels.status")}
              options={statusOptions}
              value={filters.status}
              onChange={statusOption =>
                setFilters({ ...filters, status: statusOption })
              }
            />
          </div>
        </Pane.Body>
        <Pane.Footer className="space-x-3">
          <Button
            className="bg-indigo-700"
            label={t("labels.done")}
            onClick={() => {
              setShouldShowFilterPane(false);
            }}
          />
          <Button
            label={t("labels.clearFilter")}
            style="secondary"
            type="reset"
            onClick={handleClearFilter}
          />
        </Pane.Footer>
      </Pane>
      <Alert
        isOpen={shouldShowDeleteAlert}
        title={t("titles.post.deleteBulk")}
        message={
          <Trans
            components={{ strong: <strong /> }}
            i18nKey="messages.deleteBulkPosts"
            values={{ numberOfSelectedRows }}
          />
        }
        onClose={() => setShouldShowDeleteAlert(false)}
        onSubmit={() => {
          handleBulkDelete();
          setShouldShowDeleteAlert(false);
        }}
      />
    </>
  );
};

export default Header;

import React, { useState } from "react";

import { PageHeader } from "components/commons";
import { t } from "i18next";
import { Filter } from "neetoicons";
import {
  ActionDropdown,
  Typography,
  Button,
  Pane,
  Checkbox,
  Input,
  Select,
} from "neetoui";
import { Trans } from "react-i18next";

import { DROPDOWN_MENU, statusOptions } from "./constant";

const Header = ({
  totalPosts,
  visibleColumns,
  setVisibleColumns,
  filters,
  setFilters,
  categoryOptions,
}) => {
  const [shouldShowFilterPane, setShouldShowFilterPane] = useState(false);
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
      status: { value: "" },
      category_ids: [],
    });
  };

  return (
    <>
      <PageHeader style="h1" title={t("titles.myBlogPosts")} />
      <div className="flex items-center justify-between">
        <Typography>
          <Trans i18nKey="totalArticles" values={{ totalPosts }} />
        </Typography>
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
      <Pane
        isOpen={shouldShowFilterPane}
        size="small"
        onClose={handleShowFilterPane}
      >
        <Pane.Header>
          <Typography style="h2" weight="semibold">
            Filters
          </Typography>
        </Pane.Header>
        <Pane.Body>
          <div className="flex w-full flex-col space-y-5">
            <Input
              className="w-full"
              label="Title"
              value={filters.title}
              onChange={e => setFilters({ ...filters, title: e.target.value })}
            />
            <Select
              isMulti
              className="w-full"
              label="Category"
              options={categoryOptions}
              value={categoryValues()}
              onChange={selectedOption => handleCategoryChange(selectedOption)}
            />
            <Select
              isClearable
              className="w-full"
              label="Status"
              options={statusOptions}
              value={filters.status.value}
              onChange={statusOption =>
                setFilters({ ...filters, status: statusOption.value })
              }
            />
          </div>
        </Pane.Body>
        <Pane.Footer className="space-x-3">
          <Button
            className="bg-indigo-700"
            label="Done"
            onClick={() => {
              setShouldShowFilterPane(false);
            }}
          />
          <Button
            label="Clear filters"
            style="secondary"
            tyep="reset"
            onClick={handleClearFilter}
          />
        </Pane.Footer>
      </Pane>
    </>
  );
};

export default Header;

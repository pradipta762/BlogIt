import React, { useState } from "react";

import { Checkbox } from "@bigbinary/neetoui";
import { PageHeader } from "components/commons";
import { t } from "i18next";
import { Filter } from "neetoicons";
import { ActionDropdown, Typography, Button, Pane } from "neetoui";
import { Trans } from "react-i18next";

import { DROPDOWN_MENU } from "./constant";

const ActionDropdownMenu = ({
  totalPosts,
  visibleColumns,
  setVisibleColumns,
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
      <Pane isOpen={shouldShowFilterPane} />
    </>
  );
};

export default ActionDropdownMenu;

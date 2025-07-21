import React from "react";

import { Check } from "neetoicons";
import { ActionDropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import { POST_STATUS } from "./constants";

const ActionDropdownMenu = ({ status, setStatus, handleSubmit }) => {
  const { t } = useTranslation();
  const isPostPublished = status === POST_STATUS.PUBLISHED;

  const buttonLabel = isPostPublished
    ? t("labels.publish")
    : t("labels.saveAsDraft");

  return (
    <ActionDropdown
      buttonStyle="primary"
      label={buttonLabel}
      buttonProps={{
        className: "bg-indigo-700",
      }}
      dropdownProps={{
        buttonProps: {
          className: "bg-indigo-700",
        },
      }}
      onClick={handleSubmit}
    >
      <ActionDropdown.Menu>
        <ActionDropdown.MenuItem.Button
          prefix={isPostPublished ?? <Check size={20} />}
          onClick={() => setStatus("published")}
        >
          {t("labels.publish")}
        </ActionDropdown.MenuItem.Button>
        <ActionDropdown.MenuItem.Button
          prefix={!isPostPublished ?? <Check size={20} />}
          onClick={() => setStatus("draft")}
        >
          {t("labels.saveAsDraft")}
        </ActionDropdown.MenuItem.Button>
      </ActionDropdown.Menu>
    </ActionDropdown>
  );
};

export default ActionDropdownMenu;

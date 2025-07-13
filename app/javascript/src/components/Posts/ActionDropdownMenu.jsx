import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import { ActionDropdown } from "@bigbinary/neetoui";

import { POST_STATUS } from "./constants";

const ActionDropdownMenu = ({ status, setStatus, handleSubmit }) => {
  const isPostPublished = status === POST_STATUS.PUBLISHED;

  const buttonLabel = isPostPublished ? "Publish" : "Show as draft";

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
          Publish
        </ActionDropdown.MenuItem.Button>
        <ActionDropdown.MenuItem.Button
          prefix={!isPostPublished ?? <Check size={20} />}
          onClick={() => setStatus("draft")}
        >
          Save as draft
        </ActionDropdown.MenuItem.Button>
      </ActionDropdown.Menu>
    </ActionDropdown>
  );
};

export default ActionDropdownMenu;

import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import { ActionDropdown } from "@bigbinary/neetoui";

import { POST_STATUS } from "./constants";

const ActionDropdownMenu = ({ status, setStatus, handleStatusChanged }) => {
  const isPostPublished = status === POST_STATUS.PUBLISHED;

  const buttonLabel = isPostPublished ? "Publish" : "Show as draft";

  return (
    <ActionDropdown
      buttonStyle="primary"
      label={buttonLabel}
      onClick={handleStatusChanged}
    >
      <ActionDropdown.Menu>
        <ActionDropdown.MenuItem.Button
          prefix={isPostPublished ?? <Check />}
          onClick={() => setStatus("published")}
        >
          Publish
        </ActionDropdown.MenuItem.Button>
        <ActionDropdown.MenuItem.Button
          prefix={!isPostPublished ?? <Check />}
          onClick={() => setStatus("draft")}
        >
          Save as draft
        </ActionDropdown.MenuItem.Button>
      </ActionDropdown.Menu>
    </ActionDropdown>
  );
};

export default ActionDropdownMenu;

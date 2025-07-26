import React from "react";

import classNames from "classnames";
import { Tooltip } from "neetoui";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Item = ({ path, icon: Icon, tooltipContent, className = "" }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Tooltip content={tooltipContent}>
      <Link
        to={path}
        className={classNames(
          "flex items-center justify-center rounded-lg border p-2",
          className,
          {
            "border border-indigo-600 bg-indigo-50 text-indigo-600":
              isActive && !className.includes("bg-indigo-800"),
            "text-indigo-600 hover:bg-indigo-100":
              !isActive && !className.includes("bg-indigo-800"),
          }
        )}
      >
        <Icon size={25} />
      </Link>
    </Tooltip>
  );
};

export default Item;

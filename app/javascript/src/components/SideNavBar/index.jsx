import React from "react";

import { Book, Draft } from "@bigbinary/neeto-icons";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";

import UserProfile from "./UserProfile";

import routes from "../../routes";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sticky top-0 z-20 h-screen w-max border-r border-gray-200 bg-white shadow-sm">
      <div className="flex h-full flex-col justify-between px-4 py-8">
        <div className="flex flex-col space-y-4">
          <Link
            to={routes.dashboard}
            className={classNames(
              "flex items-center justify-center rounded-lg bg-slate-100 p-2 text-gray-600 transition-colors hover:bg-slate-200",
              {
                "bg-indigo-200 text-indigo-800":
                  location.pathname === routes.dashboard,
              }
            )}
          >
            <Book size={20} />
          </Link>
          <Link
            to={routes.posts.create}
            className={classNames(
              "flex items-center justify-center rounded-lg bg-slate-100 p-2 text-gray-600 transition-colors hover:bg-slate-200",
              {
                "bg-indigo-200 text-indigo-800":
                  location.pathname === routes.posts.create,
              }
            )}
          >
            <Draft size={20} />
          </Link>
        </div>
        <UserProfile />
      </div>
    </aside>
  );
};

export default Sidebar;

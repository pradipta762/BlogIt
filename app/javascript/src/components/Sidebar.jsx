import React from "react";

import { Book } from "@bigbinary/neeto-icons";
import { Avatar } from "@bigbinary/neetoui";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-primary-white sticky top-0 z-20 h-screen w-max border-r border-gray-300 transition-all duration-500">
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-between px-6 py-4">
        <div className="flex h-16 items-center justify-between">
          <div className="w-max flex-shrink-0">
            <Link className="h-full w-auto" to="/posts">
              <div className="rounded-lg bg-slate-700 p-2 text-white">
                <Book />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <Link
              to="/posts"
              className={classNames("text-sm font-medium text-gray-800", {
                "text-indigo-600": location.pathname === "/posts",
              })}
            >
              <i className="ri-list-check-3" />
            </Link>
          </div>
        </div>
        <div>
          <Avatar
            className="bg-purple-400"
            size="large"
            user={{
              name: "Pradipta Dash",
            }}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

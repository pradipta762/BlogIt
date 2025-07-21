import React, { useState } from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import classNames from "classnames";
import Logger from "js-logger";
import { Book, Edit, NeetoChangelog, ListDetails, Folder } from "neetoicons";
import { Button } from "neetoui";
import routes from "routes";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import CategoryPane from "./Category";
import Item from "./Item";
import UserProfile from "./UserProfile";

const Sidebar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const toggleCategoriesOpen = () => setIsCategoriesOpen(prev => !prev);
  const name = getFromLocalStorage("authUserName");
  const email = getFromLocalStorage("authEmail");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = routes.auth.login;
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-between">
      <aside className="sticky top-0 z-20 h-screen border-r border-gray-200 bg-white shadow-sm">
        <div className="flex h-full flex-col justify-between px-4 py-8">
          <div className="flex flex-col space-y-4">
            <Item
              className="bg-indigo-800 text-white hover:bg-indigo-800"
              icon={Book}
              path={routes.dashboard}
            />
            <Item icon={NeetoChangelog} path={routes.root} />
            <Item icon={Edit} path={routes.posts.create} />
            <Item icon={Folder} path={routes.posts.myPost} />
            <Button
              icon={ListDetails}
              size="large"
              style="tertiary"
              className={classNames(
                "flex items-center justify-center rounded-lg border p-2",
                {
                  "border border-indigo-600 bg-indigo-50 text-indigo-600":
                    isCategoriesOpen,
                  "text-indigo-600 hover:bg-indigo-100": !isCategoriesOpen,
                }
              )}
              onClick={toggleCategoriesOpen}
            />
          </div>
          <UserProfile {...{ handleLogout, name, email }} />
        </div>
      </aside>
      {isCategoriesOpen && <CategoryPane {...{ toggleCategoriesOpen }} />}
    </div>
  );
};

export default Sidebar;

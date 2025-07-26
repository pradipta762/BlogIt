import React, { useEffect, useState } from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import classNames from "classnames";
import Logger from "js-logger";
import { Book, Edit, NeetoChangelog, ListDetails, Folder } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import CategoryPane from "./Category";
import Item from "./Item";
import UserProfile from "./UserProfile";

const Sidebar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCategoryButtonDisabled, setIsCategoryButtonDisabled] =
    useState(true);

  const toggleCategoriesOpen = () => setIsCategoriesOpen(prev => !prev);

  const name = getFromLocalStorage("authUserName");
  const email = getFromLocalStorage("authEmail");

  const { t } = useTranslation();
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === routes.dashboard) {
      setIsCategoryButtonDisabled(false);
    } else {
      setIsCategoryButtonDisabled(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen items-center justify-between">
      <aside className="sticky top-0 z-20 h-screen border-r border-gray-200 bg-white shadow-sm">
        <div className="flex h-full flex-col justify-between px-4 py-8">
          <div className="flex flex-col space-y-4">
            <Item
              className="bg-indigo-800 text-white hover:bg-indigo-800"
              icon={Book}
              path={routes.dashboard}
              tooltipContent={t("labels.toolTipProps.posts")}
            />
            <Item
              icon={NeetoChangelog}
              path={routes.root}
              tooltipContent={t("labels.toolTipProps.dashboard")}
            />
            <Item
              icon={Edit}
              path={routes.posts.create}
              tooltipContent={t("labels.toolTipProps.newPost")}
            />
            <Item
              icon={Folder}
              path={routes.posts.myPost}
              tooltipContent={t("labels.toolTipProps.myPosts")}
            />
            <Button
              disabled={isCategoryButtonDisabled}
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
              tooltipProps={{
                content: t("labels.toolTipProps.category"),
              }}
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

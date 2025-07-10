import React, { useState } from "react";

import {
  Book,
  Edit,
  NeetoChangelog,
  ListDetails,
} from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import classNames from "classnames";

import CategoryPane from "./Category";
import Item from "./Item";
import UserProfile from "./UserProfile";

import routes from "../../routes";

const Sidebar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const toggleCategoriesOpen = () => setIsCategoriesOpen(prev => !prev);

  return (
    <div className="flex items-center justify-between">
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
          <UserProfile />
        </div>
      </aside>
      {isCategoriesOpen && <CategoryPane {...{ toggleCategoriesOpen }} />}
    </div>
  );
};

export default Sidebar;

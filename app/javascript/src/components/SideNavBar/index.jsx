import React from "react";

import { Book, Edit, NeetoChangelog } from "@bigbinary/neeto-icons";

import Item from "./Item";
import UserProfile from "./UserProfile";

import routes from "../../routes";

const Sidebar = () => (
  <aside className="sticky top-0 z-20 h-screen w-max border-r border-gray-200 bg-white shadow-sm">
    <div className="flex h-full flex-col justify-between px-4 py-8">
      <div className="flex flex-col space-y-4">
        <Item
          className="bg-indigo-800 text-white hover:bg-indigo-800"
          icon={Book}
          path={routes.dashboard}
        />
        <Item icon={NeetoChangelog} path={routes.root} />
        <Item icon={Edit} path={routes.posts.create} />
      </div>
      <UserProfile />
    </div>
  </aside>
);

export default Sidebar;

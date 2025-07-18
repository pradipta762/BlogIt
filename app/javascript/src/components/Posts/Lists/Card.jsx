import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import List from "../Categories/List";
import { formatDate } from "../utils";

const Card = ({ title, user, categories, updated_at, slug }) => {
  const formattedDate = formatDate(updated_at);

  return (
    <div className="w-full border-b border-gray-200 py-3">
      <Link to={`posts/${slug}/show`}>
        <Typography
          className="mb-3 w-max border-b-2 border-white text-xl font-semibold transition delay-150 hover:border-indigo-100"
          style="h2"
        >
          {title}
        </Typography>
      </Link>
      <List {...{ categories }} />
      <div className="mt-3 flex flex-col text-sm text-gray-600">
        <Typography className="font-medium text-black">{user?.name}</Typography>
        <Typography className="text-sm text-gray-400 ">
          {formattedDate}
        </Typography>
      </div>
    </div>
  );
};

export default Card;

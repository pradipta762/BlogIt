import React from "react";

import { Typography } from "@bigbinary/neetoui";
import dayjs from "dayjs";

const Card = ({ title, description, created_at }) => {
  const formattedDate = dayjs(created_at).format("DD MMMM YYYY");

  return (
    <div className="w-full border-b border-gray-200 py-2">
      <Typography className="mb-2 font-medium" style="h2">
        {title}
      </Typography>
      <Typography className="mb-2 line-clamp-2 text-gray-700">
        {description}
      </Typography>
      <Typography className="text-sm text-gray-500">{formattedDate}</Typography>
    </div>
  );
};

export default Card;

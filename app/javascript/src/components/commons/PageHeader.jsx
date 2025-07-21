import React from "react";

import { Typography } from "neetoui";

const PageHeader = ({ title, style, children }) => (
  <div className="flex w-full items-center justify-between">
    <Typography className="text-4xl font-bold" style={style}>
      {title}
    </Typography>
    {children}
  </div>
);

export default PageHeader;

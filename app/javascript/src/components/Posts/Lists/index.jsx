import React from "react";

import Card from "./Card";

const Lists = ({ posts }) => (
  <div className="flex flex-col space-y-4">
    {posts.map(({ id, title, description, created_at, slug }) => (
      <Card key={id} {...{ title, description, created_at, slug }} />
    ))}
  </div>
);

export default Lists;

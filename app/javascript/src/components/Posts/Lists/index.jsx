import React from "react";

import Card from "./Card";

const Lists = ({ filteredPosts: posts }) => (
  <div className="flex flex-col space-y-4">
    {posts.map(post => (
      <Card key={post.id} {...post} />
    ))}
  </div>
);

export default Lists;

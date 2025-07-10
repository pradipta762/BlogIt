import React from "react";

import { Avatar, Typography } from "@bigbinary/neetoui";
import { Container, PageLoader } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import List from "./Categories/List";
import { formatDate } from "./utils";

import routes from "../../routes";

const ShowPost = () => {
  const { slug } = useParams();
  const history = useHistory();

  const { data: post, isLoading, error } = useShowPost(slug);
  const userName = post?.user?.name;
  const createdAt = formatDate(post?.created_at);

  if (error) {
    Logger.error(error);
    history.push(routes.root);
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8 p-6">
        <div className="mt-8 flex w-full items-start justify-between gap-x-6">
          <div className="flex flex-col gap-y-3">
            <List categories={post?.categories} />
            <Typography className="text-4xl font-semibold" style="h2">
              {post?.title}
            </Typography>
            <div className="flex items-center gap-4">
              <Avatar
                size="large"
                user={{
                  name: userName,
                }}
              />
              <div>
                <Typography className="font-semibold">{userName}</Typography>
                <Typography className="text-sm text-gray-400">
                  {createdAt}
                </Typography>
              </div>
            </div>
            <Typography>{post?.description}</Typography>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShowPost;

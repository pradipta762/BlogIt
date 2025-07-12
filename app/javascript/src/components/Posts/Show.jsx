import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Avatar, Button, Typography } from "@bigbinary/neetoui";
import { Container, PageLoader, PageHeader } from "components/commons";
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
  const updatedAt = formatDate(post?.updated_at);

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
          <div className="flex w-full flex-col gap-y-3">
            <List categories={post?.categories} />
            <PageHeader style="h2" title={post?.title}>
              <Button
                icon={Edit}
                size="large"
                style="text"
                to={`/posts/${slug}/edit`}
                tooltipProps={{ content: "Edit Task" }}
              />
            </PageHeader>
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
                  {updatedAt}
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

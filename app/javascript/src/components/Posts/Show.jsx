import React from "react";

import { Container, PageLoader, PageHeader } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { Edit } from "neetoicons";
import { Avatar, Button, Tag, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import List from "./Categories/List";
import { POST_STATUS } from "./constants";
import { formatDate } from "./utils";

const ShowPost = () => {
  const { slug } = useParams();
  const history = useHistory();

  const { t } = useTranslation();

  const { data: post, isLoading, error } = useShowPost(slug);
  const userName = post?.user?.name;
  const updatedAt = formatDate(post?.updated_at);

  const isDraftPost = post?.status === POST_STATUS.DRAFT;

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
            <PageHeader
              style="h2"
              title={
                <div className="flex items-center gap-4">
                  <span>{post?.title}</span>
                  {isDraftPost && <Tag label="Draft" style="danger" />}
                </div>
              }
            >
              <Button
                icon={Edit}
                size="large"
                style="text"
                to={`/posts/${slug}/edit`}
                tooltipProps={{ content: t("labels.editPost") }}
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

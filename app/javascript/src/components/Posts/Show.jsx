import React, { useState } from "react";

import { Container, PageLoader, PageHeader } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { Edit, Download } from "neetoicons";
import { Avatar, Button, Tag, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import List from "./Categories/List";
import { POST_STATUS } from "./constants";
import DownloadPost from "./Download";
import { formatDate } from "./utils";

const ShowPost = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

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
                  <Typography style="h1">{post?.title}</Typography>
                  {isDraftPost && (
                    <Tag label={t("labels.draft")} style="danger" />
                  )}
                </div>
              }
            >
              <div className="space-x-4">
                <Button
                  icon={Download}
                  size="large"
                  style="text"
                  tooltipProps={{ content: t("labels.downloadPost") }}
                  onClick={() => setIsDownloadModalOpen(true)}
                />
                <Button
                  icon={Edit}
                  size="large"
                  style="text"
                  to={`/posts/${slug}/edit`}
                  tooltipProps={{ content: t("labels.editPost") }}
                />
              </div>
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
      {isDownloadModalOpen && (
        <DownloadPost
          {...{ setIsDownloadModalOpen }}
          description={
            <Trans
              components={{ strong: <strong /> }}
              i18nKey="generatePdf"
              values={{ postTitle: post.title }}
            />
          }
        />
      )}
    </Container>
  );
};

export default ShowPost;

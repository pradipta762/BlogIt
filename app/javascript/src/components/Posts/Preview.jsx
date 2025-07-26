import React, { useEffect } from "react";

import { Container, PageHeader } from "components/commons";
import { Avatar, Button, Tag, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import usePostPreviewStore from "stores/postPreviewStore";

import List from "./Categories/List";
import { formatDate } from "./utils";

const PreviewPost = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { previewPost } = usePostPreviewStore();

  useEffect(() => {
    if (!previewPost) {
      history.push(routes.dashboard);
    }
  }, [previewPost]);

  if (!previewPost) return null;

  const { title, description, categories, user, updated_at, status } =
    previewPost;

  const isDraftPost = status === "draft";

  return (
    <Container>
      <div className="flex flex-col gap-y-8 p-6">
        <div className="mt-8 flex w-full items-start justify-between gap-x-6">
          <div className="flex w-full flex-col gap-y-3">
            <List categories={categories} />
            <PageHeader
              style="h2"
              title={
                <div className="flex items-center gap-4">
                  <Typography style="h1">{title}</Typography>
                  {isDraftPost && (
                    <Tag label={t("labels.draft")} style="danger" />
                  )}
                </div>
              }
            >
              <div className="space-x-4">
                <Button
                  label={t("labels.backToEdit")}
                  style="secondary"
                  onClick={() => history.goBack()}
                />
              </div>
            </PageHeader>
            <div className="flex items-center gap-4">
              <Avatar size="large" user={{ name: user?.name }} />
              <div>
                <Typography className="font-semibold">{user?.name}</Typography>
                <Typography className="text-sm text-gray-400">
                  {formatDate(updated_at)}
                </Typography>
              </div>
            </div>
            <Typography>{description}</Typography>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PreviewPost;

import React from "react";

import { Container } from "components/commons";
import { Typography, Button } from "neetoui";
import routes from "routes";

import withT from "./WithT";

const EmptyBlogs = withT(({ t }) => (
  <Container className="flex min-h-screen flex-col items-center justify-center gap-4">
    <Typography className="text-center text-xl font-medium text-gray-600">
      {t("errors.noBlogFound")}
    </Typography>
    <Button
      className="bg-indigo-700 hover:bg-indigo-800"
      label={t("labels.newPost")}
      to={routes.posts.create}
    />
  </Container>
));

export default EmptyBlogs;

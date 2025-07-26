import React from "react";

import { PageLoader } from "components/commons";
import { Button, Input, Select, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import routes from "routes";

import { makeOrganizationsOptions } from "../utils";

const Signup = ({
  handleSubmit,
  setName,
  setEmail,
  setPassword,
  signupPageLoading,
  setPasswordConfirmation,
  organizations,
  setOrganizationId,
}) => {
  const organizationOptions = makeOrganizationsOptions(organizations);
  const { t } = useTranslation();

  if (signupPageLoading) return <PageLoader />;

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50
    px-4 py-12 sm:px-6 lg:px-8 "
    >
      <div className="w-full max-w-md">
        <Typography
          style="h2"
          className="mt-6 text-center text-3xl font-extrabold
        leading-9 text-gray-800"
        >
          {t("labels.auth.signup")}
        </Typography>
        <div className="text-center">
          <Link
            to={routes.auth.login}
            className="mt-2 text-center text-sm font-medium
            text-indigo-600 "
          >
            {t("labels.auth.orLogin")}
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label={t("labels.auth.name")}
            placeholder={t("placeholders.name")}
            size="large"
            onChange={e => setName(e.target.value)}
          />
          <Input
            label={t("labels.auth.email")}
            placeholder={t("placeholders.email")}
            size="large"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Select
            label={t("labels.auth.organization")}
            options={organizationOptions}
            placeholder={t("placeholders.organization")}
            size="large"
            onChange={({ value }) => setOrganizationId(value)}
          />
          <Input
            label={t("labels.auth.password")}
            placeholder={t("placeholders.password")}
            size="large"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            label={t("labels.auth.passwordConfirmation")}
            placeholder={t("placeholders.password")}
            size="large"
            type="password"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <Button
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700"
            label={t("labels.auth.register")}
            size="large"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;

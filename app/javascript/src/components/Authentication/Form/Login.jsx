import React from "react";

import { PageLoader } from "components/commons";
import { t } from "i18next";
import { Button, Input, Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";

const Login = ({ handleSubmit, setEmail, setPassword, loginPageLoading }) => {
  if (loginPageLoading) return <PageLoader />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Typography
          className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-700"
          style="h2"
        >
          {t("labels.signin")}
        </Typography>
        <div className="text-center">
          <Link
            className="mt-2 text-sm font-medium text-indigo-500 transition duration-150 ease-in-out focus:underline focus:outline-none"
            to={routes.auth.signup}
          >
            {t("labels.orRegister")}
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label={t("labels.email")}
            placeholder={t("placeholders.email")}
            size="large"
            type="email"
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <Input
            label={t("labels.password")}
            placeholder={t("placeholders.password")}
            size="large"
            type="password"
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <Button
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700"
            label={t("labels.signin")}
            size="large"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

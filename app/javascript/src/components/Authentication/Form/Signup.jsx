import React from "react";

import { Button, Input, Select, Typography } from "@bigbinary/neetoui";
import { PageLoader } from "components/commons";
import Logger from "js-logger";
import { Link } from "react-router-dom";

import routes from "../../../routes";
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
  Logger.info(organizations);
  Logger.info(organizationOptions);

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
          Sign Up
        </Typography>
        <div className="text-center">
          <Link
            to={routes.auth.login}
            className="mt-2 text-center text-sm font-medium
            text-indigo-600 "
          >
            Or Login Now
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label="Name"
            placeholder="Oliver"
            size="large"
            onChange={e => setName(e.target.value)}
          />
          <Input
            label="Email"
            placeholder="oliver@example.com"
            size="large"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Select
            label="Organization"
            options={organizationOptions}
            placeholder="Select your organization"
            size="large"
            onChange={({ value }) => setOrganizationId(value)}
          />
          <Input
            label="Password"
            placeholder="********"
            size="large"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            label="Password Confirmation"
            placeholder="********"
            size="large"
            type="password"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <Button
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700"
            label="Register"
            size="large"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;

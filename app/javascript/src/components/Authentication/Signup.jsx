import React, { useState } from "react";

import SignupForm from "components/Authentication/Form/Signup";
import { useSignup } from "hooks/reactQuery/useAuthApi";
import { useFetchOrganizations } from "hooks/reactQuery/useOrganizationsApi";
import Logger from "js-logger";

import routes from "../../routes";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [organizationId, setOrganizationId] = useState(null);

  const { data: organizations } = useFetchOrganizations();

  const { mutate: signup, isLoading: signupPageLoading } = useSignup({
    onSuccess: () => history.push(routes.root),
    onError: error => Logger.error(error),
  });

  const handleSubmit = async event => {
    event.preventDefault();
    await signup({
      name,
      email,
      organization_id: organizationId,
      password,
      password_confirmation: passwordConfirmation,
    });
  };

  return (
    <SignupForm
      {...{
        handleSubmit,
        signupPageLoading,
        setEmail,
        setName,
        setPassword,
        setPasswordConfirmation,
        organizations,
        setOrganizationId,
      }}
    />
  );
};

export default Signup;

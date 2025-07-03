import React, { useState } from "react";

import { Container, PageTitle } from "components/commons";
import Logger from "js-logger";

import Form from "./Form";

import postsApi from "../../apis/posts";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({ title, description });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container className="w-full">
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Add new blog" />
        <Form
          {...{
            title,
            setTitle,
            description,
            setDescription,
            loading,
            handleSubmit,
          }}
        />
      </div>
    </Container>
  );
};

export default CreateTask;

import React from "react";

import { Button, Input, Textarea } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "./constants";

import routes from "../../routes";

const Form = ({
  title,
  setTitle,
  description,
  setDescription,
  loading,
  handleSubmit,
}) => {
  const history = useHistory();
  const handleCancel = () => {
    history.push(routes.dashboard);
  };

  return (
    <form
      className="flex min-h-[600px] w-full flex-col justify-between rounded-xl border px-10 py-8 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Input
          required
          label="Title"
          maxLength={MAX_TITLE_LENGTH}
          placeholder="Blog Title (Max 125 characters allowed)"
          value={title}
          onBlur={({ target: { value } }) => setTitle(value.trim())}
          onChange={({ target: { value } }) =>
            setTitle(value.slice(0, MAX_TITLE_LENGTH))
          }
        />
        <Textarea
          required
          label="Description"
          maxLength={MAX_DESCRIPTION_LENGTH}
          placeholder="Description (Max 10000 characters allowed)"
          rows="10"
          value={description}
          onBlur={({ target: { value } }) => setDescription(value.trim())}
          onChange={({ target: { value } }) =>
            setDescription(value.slice(0, MAX_DESCRIPTION_LENGTH))
          }
        />
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <Button label="Cancel" style="secondary" onClick={handleCancel} />
        <Button
          className="bg-indigo-700 hover:bg-indigo-800"
          label="Submit"
          loading={loading}
          type="submit"
        />
      </div>
    </form>
  );
};

export default Form;

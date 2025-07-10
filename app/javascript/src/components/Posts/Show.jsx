import React from "react";

import { Container, PageLoader } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import routes from "../../routes";

const ShowPost = () => {
  const { slug } = useParams();
  const history = useHistory();

  const { data: post, isLoading, error } = useShowPost(slug);

  if (error) {
    Logger.error(error);
    history.push(routes.root);
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <div className="mt-8 flex w-full items-start justify-between gap-x-6">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-3xl font-semibold">{post?.title}</h2>
            <p>{post?.description}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShowPost;

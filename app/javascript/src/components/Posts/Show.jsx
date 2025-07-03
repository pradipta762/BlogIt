import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import postsApi from "../../apis/posts";
import { Container, PageLoader } from "../commons";

const ShowPost = () => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
      setPageLoading(false);
    } catch (error) {
      Logger.error(error);
      history.push("/");
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
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

import React, { useEffect, useState } from "react";

import { Button } from "@bigbinary/neetoui";
import { isNil, isEmpty, either } from "ramda";

import postsApi from "../../apis/posts";
import { Container, PageLoader, PageTitle } from "../commons";
import Lists from "../Posts/Lists";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container className="flex min-h-screen w-full items-center justify-center">
        <h1 className="my-5 text-center text-xl leading-5">
          You have not posted any blogs.
        </h1>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col space-y-4">
      <div className="flex items-end justify-between">
        <PageTitle title="Blog posts" />
        <Button
          className="bg-indigo-600 hover:bg-indigo-800"
          label="Add a new post"
          to="posts/create"
        />
      </div>
      <Lists {...{ posts }} className="w-full flex-1" />
    </Container>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";

import { Spinner } from "neetoui";
import { isNil, isEmpty, either } from "ramda";

import postsApi from "../../apis/posts";
import { Container, PageTitle } from "../commons";
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
    return (
      <div className="h-screen w-screen">
        <Spinner />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not posted any blogs.
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <PageTitle title="Blog It" />
        <Lists />
      </div>
    </Container>
  );
};

export default Dashboard;

import React from "react";

import Dashboard from "components/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CreatePost from "./components/Posts/Create";
import ShowPost from "./components/Posts/Show";
import routes from "./routes";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Router>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route exact component={CreatePost} path={routes.posts.create} />
          <Route exact component={ShowPost} path={routes.posts.show} />
          <Route exact component={Dashboard} path={routes.dashboard} />
        </Switch>
      </QueryClientProvider>
    </Router>
  );
};

export default App;

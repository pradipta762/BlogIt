import React from "react";

import Dashboard from "components/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
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
          <Redirect from={routes.root} to={routes.dashboard} />
        </Switch>
      </QueryClientProvider>
    </Router>
  );
};

export default App;

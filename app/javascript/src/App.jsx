import React from "react";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Dashboard from "components/Dashboard";
import { either, isEmpty, isNil } from "ramda";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "utils/storage";

import { CreatePost, EditPost, MyPost, ShowPost } from "./components/Posts";
import routes from "./routes";

const App = () => {
  const queryClient = new QueryClient();
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route exact component={CreatePost} path={routes.posts.create} />
          <Route exact component={ShowPost} path={routes.posts.show} />
          <Route exact component={EditPost} path={routes.posts.edit} />
          <Route exact component={MyPost} path={routes.posts.myPost} />
          <Route exact component={Dashboard} path={routes.dashboard} />
          <Route exact component={Signup} path={routes.auth.signup} />
          <Route exact component={Login} path={routes.auth.login} />
          <Redirect from={routes.root} to={routes.dashboard} />
          <PrivateRoute
            component={Dashboard}
            condition={isLoggedIn}
            path={routes.root}
            redirectRoute={routes.auth.login}
          />
        </Switch>
      </QueryClientProvider>
    </Router>
  );
};

export default App;

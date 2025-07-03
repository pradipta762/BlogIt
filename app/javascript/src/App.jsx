import React from "react";

import Dashboard from "components/Dashboard";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CreatePost from "./components/Posts/Create";
import ShowPost from "./components/Posts/Show";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={CreatePost} path="/posts/create" />
      <Route exact component={ShowPost} path="/posts/:slug/show" />
      <Route exact component={Dashboard} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;

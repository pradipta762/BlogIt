import React from "react";

import Dashboard from "components/Dashboard";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CreateTask from "./components/Posts/Create";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={CreateTask} path="/posts/create" />
      <Route exact component={Dashboard} path="/dashboard" />
    </Switch>
  </Router>
);

export default App;

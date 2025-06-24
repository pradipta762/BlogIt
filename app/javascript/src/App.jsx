import React from "react";

import Dashboard from "components/Dashboard";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => (
  <Router>
    <ToastContainer>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact component={Dashboard} path="/dashboard" />
      </Switch>
    </ToastContainer>
  </Router>
);

export default App;

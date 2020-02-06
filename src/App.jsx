import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import UserMainPageLayout from "./layouts/UserMainPageLayout";

const App = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={LandingLayout} />
        <Route exact path="/user" component={UserMainPageLayout} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;

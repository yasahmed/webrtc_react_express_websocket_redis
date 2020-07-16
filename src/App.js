import React from "react";
import CreateRoom from "./pages/create-room";
import CurrentRoom from "./pages/current-room";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/room/:id" component={CurrentRoom} />
        <Route path="/" component={CreateRoom} />
      </Switch>
    </Router>
  );
};

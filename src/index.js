import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App";
import Matches from "./components/Matches";
import Players from "./components/Players";
import LiveWatch from "./components/LiveWatch";

ReactDOM.render(
  <Router>
    <App />
    <Route exact path="/" component={Matches} />
    <Route exact path="/players" component={Players} />
    <Route exact path="/livewatch" component={LiveWatch} />
  </Router>,
  document.getElementById("root")
);

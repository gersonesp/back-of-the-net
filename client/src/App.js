import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Matches from "./components/Matches";
import Players from "./components/Players";
import LiveWatch from "./components/LiveWatch";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Matches} />
        <Route exact path="/players" component={Players} />
        <Route exact path="/livewatch" component={LiveWatch} />
      </div>
    );
  }
}

export default App;

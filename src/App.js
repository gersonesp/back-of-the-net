import React, { Component } from "react";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";

import Matches from "./components/Matches";
import Players from "./components/Players";
import LiveWatch from "./components/LiveWatch";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentDidMount() {
    fetch("/api/matches")
      .then(response => response.json())
      .then(matches =>
        this.setState({
          matches
        })
      );
  }

  render() {
    return (
      <div className="App">
        <Navbar />

        <Route
          exact
          path="/"
          render={props => <Matches {...props} matches={this.state.matches} />}
        />

        <Route exact path="/players" component={Players} />
        <Route exact path="/livewatch" component={LiveWatch} />
      </div>
    );
  }
}

export default App;

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
      .then(data => {
        const matches = data;
        let date;
        let seen = {};
        let groupedByDate = {};

        for (let i = 0; i < matches.length; i++) {
          date = matches[i].day;

          if (!seen[date]) {
            groupedByDate[date] = [matches[i]];
            seen[date] = true;
          } else {
            groupedByDate[date].push(matches[i]);
          }
        }

        this.setState({
          matches: groupedByDate
        });
      });
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

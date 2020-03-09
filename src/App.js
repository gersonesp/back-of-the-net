import React, { Component } from "react";
import { Route } from "react-router-dom";
import firebase from "./firebase";
import { Navbar, Login, Matches, Table, LiveWatch } from "./components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      fixtures: {},
      gameweek: 1,
      teams: [],
      listOfTeams: {},
      allFixtures: []
    };
    this.signout = this.signout.bind(this);
  }

  componentDidMount() {
    this.authListener();

    fetch("https://back-of-the-net.herokuapp.com/api/teams")
      .then(response => response.json())
      .then(data => {
        let listOfTeams = {};

        data.map(team => (listOfTeams[team.id] = team.name));

        this.setState({
          teams: data,
          listOfTeams
        });
      });

    fetch("https://back-of-the-net.herokuapp.com/api/fixtures")
      .then(response => response.json())
      .then(data => {
        const fixtures = data;

        this.setState({ allFixtures: data });

        const updateGameWeek = () => {
          return [
            ...new Set(
              fixtures.filter(fixture => {
                const date = new Date();
                return fixture.kickoff_time >= date.toISOString()
                  ? fixture.event
                  : null;
              })
            )
          ][0].event;
        };

        const currentFixtures = fixtures.filter(
          fixture => fixture.event === updateGameWeek()
        );

        const sameTime = {};

        //group gameweek by kickoff_time of matches and save to sameTime variable
        currentFixtures.map(fixture => {
          let kickOffTime = fixture.kickoff_time.substring(0, 10);

          if (sameTime.hasOwnProperty(kickOffTime)) {
            return (sameTime[kickOffTime] = [
              ...sameTime[kickOffTime],
              fixture
            ]);
          } else {
            return (sameTime[kickOffTime] = [fixture]);
          }
        });

        this.setState({
          fixtures: sameTime,
          gameweek: updateGameWeek()
        });
      })
      .catch(error => console.log(error.message));
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const uid = user.uid;

        this.setState({
          user: {
            displayName,
            email,
            photoURL,
            uid
          }
        });
      } else {
        // User is signed out.
        this.setState({ user: null });
      }
    });
  }

  signout() {
    this.setState({ user: null });
    firebase.auth().signOut();
  }

  render() {
    if (this.state.user) {
      return (
        <div className="App">
          {this.state.user ? <Navbar signout={this.signout} /> : <Login />}

          <Route exact path="/login" component={Login} />

          <Route
            exact
            path="/"
            render={props => <Matches {...props} state={this.state} />}
          />

          <Route
            exact
            path="/livewatch"
            render={props => <LiveWatch {...props} state={this.state} />}
          />

          <Route
            exact
            path="/table"
            render={props => <Table {...props} state={this.state} />}
          />
        </div>
      );
    } else {
      return <Login className="Login" />;
    }
  }
}

export default App;

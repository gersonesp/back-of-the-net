import React, { Component } from "react";
import { Route } from "react-router-dom";
import firebase from "./firebase";
import { Navbar, Login, Matches, Players, LiveWatch } from "./components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.signout = this.signout.bind(this);
  }

  componentDidMount() {
    this.authListener();

    fetch("/api/teams")
      .then(response => response.json())
      .then(data => {
        this.setState({
          teams: data
        });
      });

    fetch("/api/fixtures")
      .then(response => response.json())
      .then(data =>
        this.setState({
          fixtures: data
        })
      )
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

          <Route exact path="/players" component={Players} />
          <Route exact path="/livewatch" component={LiveWatch} />
        </div>
      );
    } else {
      return <Login className="Login" />;
    }
  }
}

export default App;

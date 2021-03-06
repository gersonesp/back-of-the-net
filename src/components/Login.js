import React, { Component } from "react";
import firebase from "firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error code: ${errorCode}, ${errorMessage}`);
        this.setState({ error: errorCode });
      });
  }

  handleChange(evt) {
    let value = evt.target.value;

    this.setState({
      [evt.target.name]: value
    });
  }

  render() {
    console.log(this.state.error);
    return (
      <form onSubmit={this.handleSubmit} className="loginForm">
        <div className="inputContainer">
          <h1>Back of The Net</h1>
          <div className="label-input">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="label-input">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="buttonContainer">
            <button type="submit">Log In</button>
          </div>

          <div className="authError">
            <p>{this.state.error}</p>
          </div>
        </div>
      </form>
    );
  }
}

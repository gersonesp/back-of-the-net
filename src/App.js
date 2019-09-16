import React, { Component } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentDidMount() {
    const data = axios.get("/").then(res => res);
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;

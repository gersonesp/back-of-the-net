import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Matches from "./components/Matches";
import Players from "./components/Players";
import LiveWatch from "./components/LiveWatch";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/matches" component={Matches} />
      <Route exact path="/players" component={Players} />
      <Route exact path="/livewatch" component={LiveWatch} />
    </div>
  );
}

export default App;

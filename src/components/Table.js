import React, { Component } from "react";
import { users } from "../firebase";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { userPredictions: {} };
  }

  componentDidMount() {
    const allPredictions = users.doc("allPredictions");
    allPredictions
      .get()
      .then(docs =>
        this.setState({ userPredictions: docs.data().userPredictions })
      );
  }

  render() {
    const predictions = this.state.userPredictions;

    return (
      <div>
        {Object.values(predictions).map(user =>
          user.map(gameweek =>
            Object.values(gameweek).map(userPredictions => (
              <div key={user}>{userPredictions.LIV}</div>
            ))
          )
        )}
      </div>
    );
  }
}

export default Table;

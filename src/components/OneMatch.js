import React, { Component } from "react";

class OneMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTeam: "",
      homePrediction: "",
      awayTeam: "",
      awayPrediction: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      homeTeam: this.props.match.homeTeam,
      awayTeam: this.props.match.awayTeam
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(
      `You predicted ${this.state.homeTeam} [${this.state.homePrediction}] and ${this.state.awayTeam} [${this.state.awayPrediction}]`
    );
  }

  render() {
    console.log(this.state);
    return (
      <form className="oneMatch" onSubmit={this.handleSubmit}>
        <div id="time">{this.props.match.hour}</div>

        <div className="matchCard">
          <label id="homeTeam">
            {this.props.match.homeTeam}
            <input
              type="number"
              name="homePrediction"
              value={this.state.homePrediction}
              onChange={this.handleChange}
            />
          </label>

          <label id="awayTeam">
            {this.props.match.awayTeam}
            <input
              type="number"
              name="awayPrediction"
              value={this.state.awayPrediction}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    );
  }
}

export default OneMatch;

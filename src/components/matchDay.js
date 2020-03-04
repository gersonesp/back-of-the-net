import React from "react";

const buttonStyle = {
  cursor: "default",
  borderColor: "#bababa",
  color: "#bababa"
};

export default props => {
  const {
    matchId,
    homeTeam,
    awayTeam,
    teams,
    increase,
    decrease,
    state,
    onChange
  } = props;

  return (
    typeof teams !== "undefined" &&
    typeof homeTeam !== "undefined" &&
    typeof awayTeam !== "undefined" && (
      <div id="teamContainer">
        <div>
          <div id="homeTeam">
            <div className="label-image">
              <img
                className="teamImage"
                src={state.images[teams[homeTeam]]}
                alt=""
              />
              <label>
                <div className="teamName">{teams[homeTeam]}</div>
              </label>
            </div>

            <div>
              <div>
                <button
                  className="scoreButton"
                  onClick={decrease}
                  name={`${teams[homeTeam]}-${matchId}`}
                  disabled={state.btnDisabled}
                  style={state.btnDisabled ? buttonStyle : null}
                >
                  -
                </button>
                <input
                  readOnly
                  type="number"
                  min="0"
                  max="10"
                  name={`${teams[homeTeam]}-${matchId}`}
                  value={
                    state.predictions[`${teams[homeTeam]}-${matchId}`] || 0
                  }
                  onChange={onChange}
                  disabled={state.btnDisabled}
                />
                <button
                  className="scoreButton"
                  onClick={increase}
                  name={`${teams[homeTeam]}-${matchId}`}
                  disabled={state.btnDisabled}
                  style={state.btnDisabled ? buttonStyle : null}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div id="awayTeam">
            <div className="label-image">
              <img
                className="teamImage"
                src={state.images[teams[awayTeam]]}
                alt=""
              />
              <label>
                <div className="teamName">{teams[awayTeam]}</div>
              </label>
            </div>

            <div>
              <div>
                <button
                  className="scoreButton"
                  onClick={decrease}
                  name={`${teams[awayTeam]}-${matchId}`}
                  disabled={state.btnDisabled}
                  style={state.btnDisabled ? buttonStyle : null}
                >
                  -
                </button>
                <input
                  readOnly
                  type="number"
                  min="0"
                  max="10"
                  name={`${teams[awayTeam]}-${matchId}`}
                  value={
                    state.predictions[`${teams[awayTeam]}-${matchId}`] || 0
                  }
                  onChange={onChange}
                  disabled={state.btnDisabled}
                />
                <button
                  className="scoreButton"
                  onClick={increase}
                  name={`${teams[awayTeam]}-${matchId}`}
                  disabled={state.btnDisabled}
                  style={state.btnDisabled ? buttonStyle : null}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

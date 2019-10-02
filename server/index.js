const axios = require("axios");
const request = require("request");
const express = require("express");
const app = express();

const port = 1337;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/teams", (req, res) => {
  axios
    .get("https://fantasy.premierleague.com/api/bootstrap-static/")
    .then(response => res.send(response.data.teams))
    .catch(error => console.error(error));
});

app.get("/api/fixtures", (req, res) => {
  request(
    { url: "https://fantasy.premierleague.com/api/fixtures/" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

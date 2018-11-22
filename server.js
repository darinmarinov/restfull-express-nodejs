 // Import express and all necessary modules and 
var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require("body-parser");
  timeout = require("connect-timeout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(timeout(30000));
app.use(haltOnTimedout);

// Setup Server Rquest Timeout
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
  else console.log("REQUEST TIMEOUT => change the ttl to be less 30s");
}

// Filename: routes/routes.js
// Initialize express router
const routes = require("./api/routes/routes");
routes(app);

// Send message for default URL
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

// Launch app to listen to specified port
app.listen(port);

console.log("This RESTful API server started on: " + port);

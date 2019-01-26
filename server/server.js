const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");
const PORT = process.env.PORT || 3000;
const api = require("./routes/api");
const app = express();
let server = http.Server(app);
// let socketIO = require("socket.io");
// let io = socketIO(server);

var fs = require("fs");

// require("./startup/prod")(app);
app.use(cors());
api.use(cors());

// io.on("connection", socket => {
//   console.log("user connected");

//   socket.on("new-message", message => {
//     io.emit(message);
//   });
// });

// var ad = require(Uber)({
//   server_token: "qmDVI8Lx4q63GmTI2TZGY9pf-TJ0S3RZH5yA7qMG",
//   version: "v1"
// });
// app.options("*", cors());
app.use(bodyParser.json());

app.use(express.json());
app.use("/api", api);

// app.use(express.static(__dirname + "/dist"));

app.get("/", function(req, res) {
  res.send("Helo from server");
});

// app.all("*", (req, res) => {
//   res.status(200).sendfile(__dirname + "/dist/index.html");
// });

app.listen(PORT, function() {
  console.log("Server running in local host" + PORT);
});

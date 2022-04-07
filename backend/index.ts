const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.Server(app);

mongoose.connect(
  "mongodb+srv://creeper:c1012UFG@cluster0.ybwxo.mongodb.net/vacinacao?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());

app.use(express.json());

app.use(routes);

var port = 3333;

server.listen(port, function () {
  console.log(`Server started Successfully on port ${port}`);
});

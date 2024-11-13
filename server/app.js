"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./router");
const errorHandller = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", route);
app.use(errorHandller);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

"use strict";

const express = require("express");
const taskController = require("../controller/taskController");
const { authentication } = require("../middleware/auth");
const route = express.Router();

route.use(authentication);
route.post("/", taskController.createTask);
route.get("/", taskController.getTasksByUser);

module.exports = route;

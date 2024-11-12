"use strict";

const express = require("express");
const taskController = require("../controller/taskController");
const { authentication, authorization } = require("../middleware/auth");
const route = express.Router();

route.use(authentication);
route.post("/", taskController.createTask);
route.get("/", taskController.getTasksByUser);

route.use("/:id", authorization);
route.get("/:id", taskController.getTaskById);
route.patch("/:id", taskController.updateTaskById);

module.exports = route;

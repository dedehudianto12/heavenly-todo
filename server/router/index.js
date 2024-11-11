"use strict";

const express = require("express");
const userRoute = require("./userRoute");
const taskRoute = require("./taskRoute");

const router = express.Router();

router.use("/user", userRoute);
router.use("/task", taskRoute);

module.exports = router;

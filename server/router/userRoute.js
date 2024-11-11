"use strict";

const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.use("/register", userController.registerUser);
router.use("/login", userController.loginUser);

module.exports = router;

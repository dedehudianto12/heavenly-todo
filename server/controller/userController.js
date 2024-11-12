"use strict";

const {
  registerUser: registerUserUsecase,
  loginUser: loginUserUsecase,
} = require("../usecase/userUsecase");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next({
        status: 400,
        message: "name, email, and password are required",
      });
    }

    await registerUserUsecase(name, email, password);

    res.status(201).json({
      status: "Success",
      message: "Success add user",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({
        status: 400,
        message: "email and password is required",
      });
    }
    const payload = await loginUserUsecase(email, password);
    res.status(200).json({
      status: "Success",
      message: "Success login User",
      payload,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};

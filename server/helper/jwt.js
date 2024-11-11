"use strict";

const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN;

const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
  };

  return jwt.sign(payload, secret);
};

const verifyToken = (access_token) => {
  try {
    const user = jwt.verify(access_token, secret);
    return user;
  } catch (error) {
    const newError = new Error("you need to login or register");
    newError.status = 500;
    throw newError;
  }
};

module.exports = { generateToken, verifyToken };

"use strict";

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
  };

  const secret = process.env.ACCESS_TOKEN;
  return jwt.sign(payload, secret);
};

module.exports = { generateToken };

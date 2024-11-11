"use strict";

const bcrypt = require("bcrypt");

const generatePassword = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

const checkPassword = (password, hashPassword) => {
  const isPassword = bcrypt.compareSync(password, hashPassword);
  return isPassword;
};

module.exports = {
  generatePassword,
  checkPassword,
};

"use strict";

const {
  createUser,
  findUserByName,
  findUserByEmail,
} = require("../repository/userRepository");

const { generatePassword, checkPassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");

const registerUser = async (name, email, password) => {
  const isNameUnique = await findUserByName(name);
  const isEmailUnique = await findUserByEmail(email);

  if (isEmailUnique || isNameUnique) {
    const error = new Error("Email or name is already used");
    error.status = 409;
    throw error;
  }

  const hashPassword = generatePassword(password);
  return await createUser(name, email, hashPassword);
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("Email or password is wrong");
    error.status = 402;
    throw error;
  }

  const isPasswordCorrect = checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Email or password is wrong");
    error.status = 402;
    throw error;
  }

  const access_token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
    },
    access_token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};

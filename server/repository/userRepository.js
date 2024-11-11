"use strict";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (name, email, password) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};

const findUserByName = async (name) => {
  return prisma.user.findUnique({
    where: { name },
  });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

module.exports = { createUser, findUserByName, findUserByEmail };

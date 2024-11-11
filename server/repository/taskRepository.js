"use strict";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTask = async (title, dueDate, completed, userId) => {
  return prisma.task.create({
    data: {
      title,
      dueDate,
      completed,
      userId,
    },
  });
};

const getTasksByUser = async (userId) => {
  return prisma.task.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      dueDate: true,
      completed: true,
    },
  });
};

module.exports = {
  createTask,
  getTasksByUser,
};

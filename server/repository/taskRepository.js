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

const getTaskById = async (id) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

const updateTaskById = async (id, title, dueDate, completed) => {
  const dataToUpdate = {};
  if (title !== undefined) dataToUpdate.title = title;
  if (dueDate !== undefined) dataToUpdate.dueDate = new Date(dueDate);
  if (completed !== undefined) dataToUpdate.completed = completed;

  if (Object.keys(dataToUpdate).length > 0) {
    return await prisma.task.update({
      where: { id },
      data: dataToUpdate,
    });
  } else {
    throw new Error("No fields to update");
  }
};

const deleteTaskById = async (id) => {
  return await prisma.task.delete({
    where: { id },
  });
};

module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};

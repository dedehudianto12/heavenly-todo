"use strict";

const {
  createTask: createTaskRepository,
  getTasksByUser: getTasksByUserRepository,
  getTaskById: getTaskByIdRepository,
  updateTaskById: updateTaskByIdRepository,
} = require("../repository/taskRepository");

const createTask = async (title, dueDate, userId) => {
  const taskStatus = false;
  return await createTaskRepository(title, dueDate, taskStatus, userId);
};

const getTasksByUser = async (userId) => {
  const tasks = await getTasksByUserRepository(userId);
  if (tasks.length < 1) {
    const error = new Error("your tasks is empty");
    error.status = 400;
    throw error;
  }
  return tasks;
};

const getTaskById = async (id) => {
  const task = await getTaskByIdRepository(Number(id));
  if (!task) {
    const error = new Error("task not found");
    error.status = 400;
    throw error;
  }
  return task;
};

const updateTaskById = async (id, title, dueDate, completed) => {
  const task = await getTaskByIdRepository(id);
  if (!task) {
    const error = new Error("task not found");
    error.status = 400;
    throw error;
  }
  const updateTask = await updateTaskByIdRepository(
    id,
    title,
    dueDate,
    completed
  );
  return updateTask;
};

module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTaskById,
};

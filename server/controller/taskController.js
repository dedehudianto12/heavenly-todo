"use strict";

const {
  createTask: createTaskRepository,
  getTasksByUser: getTasksByUserRepository,
} = require("../repository/taskRepository");

const createTask = async (req, res, next) => {
  try {
    const { title, dueDate, completed } = req.body;
    if (!title || !dueDate || completed == null) {
      next({
        status: 400,
        message: "title, dueDate, or status are required",
      });
    }
    await createTaskRepository(
      title,
      new Date(dueDate),
      completed,
      req.user.id
    );
    res.status(201).json({
      status: "Success",
      message: "Success add new task",
    });
  } catch (error) {
    next(error);
  }
};

const getTasksByUser = async (req, res, next) => {
  try {
    const tasks = await getTasksByUserRepository(req.user.id);
    if (tasks.length < 1) {
      return next({
        status: 400,
        message: "your tasks is empty",
      });
    }
    res.status(201).json({
      status: "Success",
      message: "Success get all task",
      payload: tasks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasksByUser,
};

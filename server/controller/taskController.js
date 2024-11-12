"use strict";

const {
  createTask: createTaskUsecase,
  getTasksByUser: getTasksByUserUsecase,
  getTaskById: getTaskByIdUsecase,
  updateTaskById: updateTaskByIdUsecase,
} = require("../usecase/taskUsecase");

const createTask = async (req, res, next) => {
  try {
    const { title, dueDate } = req.body;
    if (!title || !dueDate) {
      next({
        status: 400,
        message: "title and dueDate are required",
      });
    }
    await createTaskUsecase(title, new Date(dueDate), req.user.id);
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
    const tasks = await getTasksByUserUsecase(req.user.id);

    res.status(201).json({
      status: "Success",
      message: "Success get all task",
      payload: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await getTaskByIdUsecase(req.taskId);
    res.status(201).json({
      status: "Success",
      message: "Success get task",
      payload: task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req, res, next) => {
  try {
    const { title, dueDate, completed } = req.body;
    if (!title || !dueDate || completed == null) {
      next({
        status: 400,
        message: "title and dueDate are required",
      });
    }
    const updated = await updateTaskByIdUsecase(
      Number(req.taskId),
      title,
      new Date(dueDate),
      completed
    );

    res.status(201).json({
      status: "Success",
      message: "Success update a task",
      payload: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTaskById,
};

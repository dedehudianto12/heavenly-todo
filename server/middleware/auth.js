"use strict";

const { verifyToken } = require("../helper/jwt");
const { getTaskById } = require("../repository/taskRepository");

const authentication = (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const user = verifyToken(access_token);
    if (!user) {
      return next({
        status: 500,
        message: "you need to sign in or register",
      });
    } else {
      req.user = {
        id: user.id,
        name: user.name,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(Number(id));
    if (!task) {
      return next({
        status: 500,
        message: "task not found",
      });
    }

    if (task.userId != req.user.id) {
      return next({
        status: 500,
        message: "you are not authorized",
      });
    }
    req.taskId = id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication, authorization };

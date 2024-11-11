"use strict";

const { verifyToken } = require("../helper/jwt");

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

module.exports = { authentication };

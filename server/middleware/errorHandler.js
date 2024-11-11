"use strict";

const errorHandller = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "Error",
    message: errorMessage,
  });
};

module.exports = errorHandller;

"use strict";

const errorHandller = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  console.log(statusCode, err.message);
  res.status(statusCode).json({
    success: false,
    error: errorMessage,
  });
};

module.exports = errorHandller;

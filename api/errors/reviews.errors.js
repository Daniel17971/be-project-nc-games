const app = require("../app.js");

exports.customErrorHandler = (err, req, res, next) => {
  const { status, msg } = err;
  if (status === 404) {
    res.status(404).send({ status, msg });
  } else {
    next(err);
  }
};

exports.psqlErrorHandler = (err, req, res, next) => {
  const { code } = err;
  if (code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.serverError = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

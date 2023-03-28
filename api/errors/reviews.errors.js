const app = require("../app.js");

exports.badReviewId = (err, request, response, next) => {
  const { status, msg } = err;
  if (status === 404) {
    return response.status(404).send({ status, msg });
  } else {
    return response.status(400).send({ msg: "Error 400, bad request" });
  }
};

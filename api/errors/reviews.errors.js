const app = require("../app.js");

exports.badReviewId = (err, request, response, next) => {
  if (/^[0-9]+$/.test(request.params.review_id)) {
    return response.status(404).send({ msg: "Error 404, id does not exsist" });
  }
  if (!/^[0-9]+$/.test(request.params.review_id)) {
    return response.status(400).send({ msg: "Error 400, bad request" });
  }
};

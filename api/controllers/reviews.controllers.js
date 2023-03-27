const { fetchReview } = require("../models/reviews.models.js");

exports.selectReview = (req, res, next) => {
  const { review_id } = req.params;

  fetchReview(review_id)
    .then((review) => {
      return res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

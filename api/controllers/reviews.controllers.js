const {
  fetchReview,
  fetchReviewComments,
} = require("../models/reviews.models.js");

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

exports.selectReviewComments = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewComments(review_id)
    .then((comments) => {
      return res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

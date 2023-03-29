const {
  fetchReview,
  fetchReviewComments,
  checkExsists,
  fetchOrderedReviews,
  insertReviewComment,
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

exports.selectReviews = (req, res, next) => {
  fetchOrderedReviews()
    .then((reviews) => {
      return res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.selectReviewComments = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewComments(review_id)
    .then((comments) => {
      return Promise.all([
        checkExsists("reviews", "review_id", review_id),
        comments,
      ]);
    })
    .then((promise) => {
      const comments = promise[1];

      if (promise[0] === undefined) {
        return Promise.reject({
          status: 404,
          msg: "id does not exsist",
        });
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.addReviewComment = (req, res, next) => {
  const reqBody = req.body;
  const review_id = req.params.review_id;
  insertReviewComment(reqBody, review_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

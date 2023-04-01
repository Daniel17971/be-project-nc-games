const {
  selectReview,
  selectReviews,
  selectReviewComments,
  addReviewComment,
  updateReviewVotes,
  addReview,
} = require("../controllers/reviews.controllers");

const reviewsRouter = require("express").Router();

reviewsRouter.route("/:review_id").get(selectReview).patch(updateReviewVotes);

reviewsRouter.route("/").get(selectReviews).post(addReview);

reviewsRouter
  .route("/:review_id/comments")
  .get(selectReviewComments)
  .post(addReviewComment);

module.exports = reviewsRouter;

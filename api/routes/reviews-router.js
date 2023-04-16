const {
  selectReview,
  selectReviews,
  selectReviewComments,
  addReviewComment,
  updateReviewVotes,
  addReview,
  removeReview,
} = require("../controllers/reviews.controllers");

const reviewsRouter = require("express").Router();

reviewsRouter
  .route("/:review_id")
  .get(selectReview)
  .patch(updateReviewVotes)
  .delete(removeReview);

reviewsRouter.route("/").get(selectReviews).post(addReview);

reviewsRouter
  .route("/:review_id/comments")
  .get(selectReviewComments)
  .post(addReviewComment);

module.exports = reviewsRouter;

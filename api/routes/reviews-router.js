const {
  selectReview,
  selectReviews,
  selectReviewComments,
  addReviewComment,
  updateReviewVotes,
} = require("../controllers/reviews.controllers");

const reviewsRouter = require("express").Router();

reviewsRouter.get("/:review_id", selectReview);

reviewsRouter.get("/", selectReviews);

reviewsRouter.get("/:review_id/comments", selectReviewComments);

reviewsRouter.post("/:review_id/comments", addReviewComment);

reviewsRouter.patch("/:review_id", updateReviewVotes);

module.exports = reviewsRouter;

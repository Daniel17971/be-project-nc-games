const express = require("express");
const app = express();

const {
  selectAllCategories,
} = require("./controllers/categories.controllers.js");
const {
  selectReview,
  selectReviewComments,
  selectReviews,
  addReviewComment,
} = require("./controllers/reviews.controllers.js");
const {
  customErrorHandler,
  psqlErrorHandler,
  serverError,
} = require("./errors/reviews.errors.js");

app.use(express.json());

app.get("/api/categories", selectAllCategories);

app.get("/api/reviews/:review_id", selectReview);

app.get("/api/reviews", selectReviews);

app.get("/api/reviews/:review_id/comments", selectReviewComments);

app.post("/api/reviews/:review_id/comments", addReviewComment);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverError);

module.exports = app;

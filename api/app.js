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
  updateReviewVotes,
} = require("./controllers/reviews.controllers.js");
const {
  customErrorHandler,
  psqlErrorHandler,
  serverError,
} = require("./errors/reviews.errors.js");
const { removeComment } = require("./controllers/comments.controllers.js");
const { selectAllUsers } = require("./controllers/users.controllers.js");

app.use(express.json());

app.get("/api/categories", selectAllCategories);

app.get("/api/reviews/:review_id", selectReview);

app.get("/api/reviews", selectReviews);

app.get("/api/reviews/:review_id/comments", selectReviewComments);

app.post("/api/reviews/:review_id/comments", addReviewComment);

app.patch("/api/reviews/:review_id", updateReviewVotes);

app.delete("/api/comments/:comment_id", removeComment);

app.get("/api/users", selectAllUsers);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverError);

module.exports = app;

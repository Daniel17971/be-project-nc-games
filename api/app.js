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
const { selectEndpoints } = require("./controllers/api.controllers.js");
const apiRouter = require("./routes/api-router.js");
const usersRouter = require("./routes/users-router.js");
const commentsRouter = require("./routes/comments-router.js");
const reviewsRouter = require("./routes/reviews-router.js");
const categoriesRouter = require("./routes/categories-router.js");

app.use(express.json());

app.use("/api", apiRouter);

app.use("/api/users", usersRouter);

app.use("/api/comments", commentsRouter);

app.use("/api/reviews", reviewsRouter);

app.use("/api/categories", categoriesRouter);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(serverError);

module.exports = app;

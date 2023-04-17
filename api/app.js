const express = require("express");
const app = express();
const {
  customErrorHandler,
  psqlErrorHandler,
  serverError,
} = require("./errors/reviews.errors.js");
const cors = require("cors");
const apiRouter = require("./routes/api-router.js");
const usersRouter = require("./routes/users-router.js");
const commentsRouter = require("./routes/comments-router.js");
const reviewsRouter = require("./routes/reviews-router.js");
const categoriesRouter = require("./routes/categories-router.js");

app.use(cors());

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

const express = require("express");
const app = express();

const {
  selectAllCategories,
} = require("./controllers/categories.controllers.js");
const { selectReview } = require("./controllers/reviews.controllers.js");
const { badReviewId } = require("./errors/reviews.errors.js");

app.use(express.json());

app.get("/api/categories", selectAllCategories);

app.get("/api/reviews/:review_id", selectReview);

app.use("/api/reviews/:review_id", badReviewId);

module.exports = app;

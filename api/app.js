const express = require("express");
const app = express();

const {
  selectAllCategories,
} = require("./controllers/categories.controllers.js");

const { badCatagoriesRequest } = require("./errors/categories.errors.js");

const { selectReview } = require("./controllers/reviews.controllers.js");

app.get("/api/categories", selectAllCategories);

app.get("/api/reviews/:review_id", selectReview);

module.exports = app;

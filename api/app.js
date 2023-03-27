const express = require("express");
const app = express();
const {
  selectAllCategories,
} = require("./controllers/categories.controllers.js");
const { badCatagoriesRequest } = require("./errors/categories.errors.js");

app.get("/api/categories", selectAllCategories);

module.exports = app;

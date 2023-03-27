const express = require("express");
const app = express();

const {
  selectAllCategories,
} = require("./controllers/categories.controllers.js");

app.get("/api/categories", selectAllCategories);

module.exports = app;

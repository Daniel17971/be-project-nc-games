const {
  selectAllCategories,
} = require("../controllers/categories.controllers");

const categoriesRouter = require("express").Router();

categoriesRouter.get("/", selectAllCategories);

module.exports = categoriesRouter;

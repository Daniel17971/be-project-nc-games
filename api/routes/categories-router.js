const {
  selectAllCategories,
  addCategory,
} = require("../controllers/categories.controllers");

const categoriesRouter = require("express").Router();

categoriesRouter.route("/").get(selectAllCategories).post(addCategory);

module.exports = categoriesRouter;

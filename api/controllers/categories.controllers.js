const { response } = require("../app.js");
const {
  fetchAllCategories,
  insertCategory,
} = require("../models/categories.models.js");

exports.selectAllCategories = (req, res, next) => {
  fetchAllCategories()
    .then((categories) => {
      return res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addCategory = (req, res, next) => {
  const reqBody = req.body;
  insertCategory(reqBody)
    .then((category) => {
      return res.status(201).send({ category });
    })
    .catch((err) => {
      next(err);
    });
};

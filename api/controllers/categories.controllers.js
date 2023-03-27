const { response } = require("../app.js");
const { fetchAllCategories } = require("../models/categories.models.js");

exports.selectAllCategories = (req, res, next) => {
  fetchAllCategories()
    .then((categories) => {
      return res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

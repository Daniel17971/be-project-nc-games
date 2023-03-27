const { response } = require("../app.js");
const { fetchAllCategories } = require("../models/categories.models.js");

exports.selectAllCategories = (req, res, next) => {
  fetchAllCategories()
    .then((catagories) => {
      return res.status(200).send(catagories);
    })
    .catch((err) => {
      next(err);
    });
};

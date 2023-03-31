const { fetchEndpoints } = require("../models/api.models.js");

exports.selectEndpoints = (req, res, next) => {
  fetchEndpoints().then((endpointsArr) => {
    const endpoints = endpointsArr[0];
    res.status(200).send({ endpoints });
  });
};

const { fetchUsers, fetchUser } = require("../models/users.models.js");

exports.selectAllUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.selectUser = (req, res, next) => {
  const username = req.params.username;
  fetchUser(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

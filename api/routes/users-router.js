const {
  selectAllUsers,
  selectUser,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();
usersRouter.get("/", selectAllUsers);
usersRouter.get("/:username", selectUser);
module.exports = usersRouter;

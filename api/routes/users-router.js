const { selectAllUsers } = require("../controllers/users.controllers");

const usersRouter = require("express").Router();
usersRouter.get("/", selectAllUsers);
module.exports = usersRouter;

const { selectEndpoints } = require("../controllers/api.controllers");

const apiRouter = require("express").Router();

apiRouter.get("/", selectEndpoints);

module.exports = apiRouter;

const {
  removeComment,
  updateCommentVote,
} = require("../controllers/comments.controllers");

const commentsRouter = require("express").Router();

commentsRouter
  .route("/:comment_id")
  .delete(removeComment)
  .patch(updateCommentVote);

module.exports = commentsRouter;

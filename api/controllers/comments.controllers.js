const { deleteComment } = require("../models/comments.models.js");
const { checkExsists } = require("../models/reviews.models.js");

exports.removeComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  Promise.all([checkExsists("comments", "comment_id", comment_id)])
    .then(() => {
      Promise.all([deleteComment(comment_id)]);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

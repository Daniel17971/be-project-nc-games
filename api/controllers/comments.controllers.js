const {
  deleteComment,
  alterCommentVote,
} = require("../models/comments.models.js");
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

exports.updateCommentVote = (req, res, next) => {
  const comment_id = req.params.comment_id;
  const votes = req.body.inc_votes;
  alterCommentVote(comment_id, votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

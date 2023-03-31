const db = require("../../db/connection.js");

exports.deleteComment = (comment_id) => {
  return db.query("DELETE FROM comments WHERE comment_id=$1 RETURNING *;", [
    comment_id,
  ]);
};

exports.alterCommentVote = (comment_id, votes) => {
  return db
    .query(
      `
  UPDATE comments
  SET votes=votes+$1
  WHERE comment_id=$2
  RETURNING *;
  `,
      [votes, comment_id]
    )
    .then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "comment not found" });
      }
      return data.rows[0];
    });
};

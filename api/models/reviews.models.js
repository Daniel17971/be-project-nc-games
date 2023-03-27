const db = require("../../db/connection.js");

exports.fetchReview = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id=$1;", [review_id])
    .then((data) => {
      if (data.rows.length === 0) {
        return err;
      } else {
        return data.rows;
      }
    });
};

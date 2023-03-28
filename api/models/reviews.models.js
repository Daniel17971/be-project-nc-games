const db = require("../../db/connection.js");

exports.fetchReview = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id=$1;", [review_id])
    .then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "id does not exsist",
        });
      } else {
        return data.rows;
      }
    });
};

exports.fetchReviewComments = () => {};

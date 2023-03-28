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

exports.fetchOrderedReviews = () => {
  return db
    .query(
      `SELECT reviews.* , count(comments.review_id) AS comment_count
  FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_id
  GROUP BY reviews.review_id 
  ORDER BY reviews.created_at DESC`
    )
    .then((data) => {
      return data.rows;
    });
};

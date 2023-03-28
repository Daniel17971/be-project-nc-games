const format = require("pg-format");
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
      `SELECT reviews.review_id,reviews.title,reviews.category,reviews.designer,reviews.owner,reviews.review_img_url,
       reviews.created_at,reviews.votes 
      , count(comments.review_id) AS comment_count
  FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_id
  GROUP BY reviews.review_id 
  ORDER BY reviews.created_at DESC`
    )
    .then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "id does not exsist",
        });
      }
      return data.rows;
    });
};

exports.fetchReviewComments = (review_id) => {
  return db
    .query(`SELECT * FROM comments WHERE review_id=$1`, [review_id])
    .then((data) => {
      return data.rows;
    });
};

exports.checkExsists = (table, column, value) => {
  const queryString = format(`SELECT * FROM %I WHERE %I=$1`, table, column);
  return db.query(queryString, [value]).then((data) => {
    if (data.rows.length === 0) {
      return Promise.reject[
        {
          status: 404,
          msg: "id does not exsist",
        }
      ];
    } else {
      return data.rows;
    }
  });
};

const format = require("pg-format");
const db = require("../../db/connection.js");
const { formatReviewsQuery } = require("./models.utils.js");

exports.fetchReview = (review_id) => {
  return db
    .query(
      `SELECT reviews.* 
    , count(comments.review_id) AS comment_count
    FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_id WHERE reviews.review_id=$1
    GROUP BY reviews.review_id ;`,
      [review_id]
    )
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

exports.fetchOrderedReviews = (query) => {
  if (Object.keys(query)[0] === "order") {
    return db.query(formatReviewsQuery()).then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "id does not exsist",
        });
      }
      return data.rows;
    });
  } else if (Object.keys(query)[0] === "sort_by") {
    return db.query(formatReviewsQuery(query.sort_by, "DESC")).then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "id does not exsist",
        });
      }
      return data.rows;
    });
  } else if (Object.keys(query)[0] === "category") {
    return db
      .query(formatReviewsQuery("created_at", "DESC", false), [query.category])
      .then((data) => {
        if (data.rowCount === 0) {
          return Promise.reject({
            status: 404,
            msg: "id does not exsist",
          });
        }
        return data.rows;
      });
  } else if (Object.keys(query).length === 0) {
    return db.query(formatReviewsQuery("created_at", "DESC")).then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "id does not exsist",
        });
      }
      return data.rows;
    });
  }
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

exports.checkColumnExsists = (column, table) => {
  if (Object.keys(column).length === 0) {
    return true;
  } else {
    const queryString = format(`SELECT %I FROM %I `, column, table);
    return db.query(queryString).then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "id does not exsist",
        });
      } else {
        return data.rows;
      }
    });
  }
};

exports.checkCategoryExsists = (category) => {
  if (Object.keys(category).length === 0) {
    return category;
  } else {
    return db
      .query(`SELECT * FROM reviews WHERE category=$1`, [category.category])
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
  }
};

exports.insertReviewComment = (reqBody, review_id) => {
  return db
    .query(
      `INSERT INTO comments
  (author, body, review_id)
  VALUES
  ($1, $2, $3)
  RETURNING *;`,
      [reqBody.username, reqBody.body, review_id]
    )
    .then((data) => {
      return data.rows[0];
    });
};

exports.alterReviewVote = (votePatch, review_id) => {
  return db
    .query(
      `UPDATE reviews
  SET votes=votes+$1
  WHERE review_id=$2
  RETURNING *; `,
      [votePatch, review_id]
    )
    .then((data) => {
      return data.rows[0];
    });
};

const db = require("../../db/connection.js");

exports.fetchAllCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => {
    return data.rows;
  });
};

exports.insertCategory = (reqBody) => {
  return db
    .query(
      `INSERT INTO categories
  (slug, description)
  VALUES
  ($1, $2)
  RETURNING *;`,
      [reqBody.slug, reqBody.description]
    )
    .then((data) => {
      return data.rows[0];
    });
};

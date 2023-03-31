const db = require("../../db/connection.js");

exports.fetchUsers = () => {
  return db.query("SELECT * FROM users").then((data) => {
    return data.rows;
  });
};

exports.fetchUser = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username=$1`, [username])
    .then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "username does not exsist",
        });
      } else {
        return data.rows[0];
      }
    });
};

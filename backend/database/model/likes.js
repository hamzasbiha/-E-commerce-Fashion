const { errorMonitor } = require("http-proxy");
const conn = require("../index");

module.exports = {
  getlikes: () => {
    return new Promise((resolve, reject) => {
      const sql = `
    SELECT DISTINCT l.*, p.*, u.*
    FROM \`order\` AS o
    JOIN product AS p ON o.product_idproducts = p.idproducts
    JOIN user AS u ON o.user_id_user = u.id_user
    WHERE o.user_id_user = ?
  `;
      conn.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  addlike: () => {
    return new Promise((resolve, reject) => {
      const sql = "";
      conn.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  deleteLike: () => {
    return new Promise((resolve, reject) => {
      const sql = "";
      conn.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  updateLike: () => {
    return new Promise((resolve, reject) => {
      const sql = "";
      conn.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
};

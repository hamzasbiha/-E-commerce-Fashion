const conn = require("../index");

module.exports = {
  getAll: function () {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM `admin`";
      conn.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getOne: function (id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM `admin` WHERE id_admin = ?";
      conn.query(sql, id, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM `admin` WHERE email = ? LIMIT 1";
      conn.query(sql, [email], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  add: function (adminInfo) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO `admin` SET ?";
      conn.query(sql, adminInfo, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  deleteOne: function (id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM `admin` WHERE id_admin = ?";
      conn.query(sql, id, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  update: function (id, updatedData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE `admin` SET ? WHERE id_admin = ?";
      conn.query(sql, [updatedData, id], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  updateManagerRole: function (id, newRole) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE `admin` SET Role = ? WHERE id_User = ?";
      conn.query(sql, [newRole, id], function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
};
